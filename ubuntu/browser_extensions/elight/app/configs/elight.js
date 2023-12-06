// Elight Extension Event Page
(function () {

    if (chrome && chrome.runtime && chrome.runtime.setUninstallURL) {
        chrome.runtime.setUninstallURL("https://elight.edu.vn/uninstall-extension");
    }

    chrome.runtime.onInstalled.addListener(function (details) {
        if (details && details.reason && details.reason == 'install') {

        }
    });

    chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.tabs.create({url: "index.html"});
    });
})();
