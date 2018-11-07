window.browser = window.browser || window.chrome;

let lastRedirectedRequestId = null;
let redirect = true;

browser.storage.local.get({redirect: true}).then(results => {
    redirect = results.redirect;
});

browser.storage.onChanged.addListener(changes => {
    redirect = changes.redirect.newValue;
});

function handleRequest(details) {
    if (!redirect) {
        return {};
    }

    if (details.method !== 'GET') {
        return {};
    }

    const url = new URL(details.url);

    // AmazonSmile is only active in Germany, the U.S., and the U.K.
    const matches = url.hostname.match(/^(?:www\.)?amazon\.(de|com|co\.uk)$/);
    if (!matches) {
        return {};
    }

    const extension = matches[1];

    /* Avoid a redirect loop when Amazon tries to redirect the Smile link back
       to the regular link, but we keep trying to redirect to Smile (an example
       is amazon.com/gp/goldbox). For a given requestId, which is unique within
       a browsing session, we will only attempt the redirect once. */
    if (details.requestId === lastRedirectedRequestId) {
        lastRedirectedRequestId = null;
        return {};
    } else {
        lastRedirectedRequestId = details.requestId;
    }

    return {
        redirectUrl: `https://smile.amazon.${extension}${url.pathname}${
            url.search
        }`
    };
}

const filter = {
    urls: ['<all_urls>'],
    types: ['main_frame', 'sub_frame']
};

browser.webRequest.onBeforeRequest.addListener(handleRequest, filter, [
    'blocking'
]);

// Show a help page when the user first installs the extension
browser.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
        browser.tabs.create({url: browser.runtime.getURL('help.html')});
    }
});
