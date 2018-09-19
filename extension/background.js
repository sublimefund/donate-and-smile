window.browser = window.browser || window.chrome;

function handleRequest(details) {
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

    const filters = new RegExp('/ap/|redirect=true');

    if (filters.test(url.href)) {
        return {};
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
