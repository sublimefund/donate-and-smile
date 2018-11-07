window.browser = window.browser || window.chrome;

document.getElementById('preferences').addEventListener('click', () => {
    browser.runtime.openOptionsPage();
});

if (browser.browserAction && browser.browserAction.openPopup) {
    document.getElementById('popup').addEventListener('click', () => {
        browser.browserAction.openPopup();
    });
} else {
    // Chrome doesn't support the openPopup API method
    document.getElementById('popup').innerHTML = 'popup';
}
