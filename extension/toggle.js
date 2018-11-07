window.browser = window.browser || window.chrome;

function setIcon(redirect) {
    browser.browserAction.setIcon({
        path: `images/icon-128${redirect ? '' : '-greyscale'}.png`
    });
}

browser.storage.local.get({redirect: true}).then(results => {
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
