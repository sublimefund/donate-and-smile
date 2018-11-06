window.browser = window.browser || window.chrome;

browser.storage.local.get('redirect').then(results => {
    document.getElementById('redirect').checked = results.redirect;
});

document.getElementById('redirect').addEventListener('change', event => {
    browser.storage.local.set({redirect: event.target.checked});
});

browser.storage.onChanged.addListener(changes => {
    document.getElementById('redirect').checked = changes.redirect.newValue;
});
