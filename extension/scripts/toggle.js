window.browser = window.browser || window.chrome;

document.getElementById('help').addEventListener('click', () => {
    window.open(browser.runtime.getURL('help.html'));
});

function setIcon(redirect) {
    browser.browserAction.setIcon({
        path: `images/icon-128${redirect ? '' : '-greyscale'}.png`
    });
}

// Firefox provides the chrome namespace as a porting aid. Just using it is
// easier than pulling in the webextension-polyfill.
chrome.storage.local.get({redirect: true}, results => {
    document.getElementById('redirect').checked = results.redirect;
    setIcon(results.redirect);
});

document.getElementById('redirect').addEventListener('change', event => {
    browser.storage.local.set({redirect: event.target.checked});
    setIcon(event.target.checked);
});

browser.storage.onChanged.addListener(changes => {
    document.getElementById('redirect').checked = changes.redirect.newValue;
});
