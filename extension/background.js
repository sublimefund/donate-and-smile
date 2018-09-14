if (
    typeof window.browser === 'undefined' &&
    typeof window.chrome === 'object'
) {
    window.browser = window.chrome;
}

function handleRequest(details) {
    if (details.method !== 'GET') {
        return {};
    }

    const url = new URL(details.url);

    console.log(url);

    if (url.hostname === 'www.amazon.com') {
        return {
            redirectUrl: 'https://smile.amazon.com'
        };
    }
}

const filter = {
    urls: ['<all_urls>'],
    types: ['main_frame', 'sub_frame']
};

browser.webRequest.onBeforeRequest.addListener(handleRequest, filter, [
    'blocking'
]);
