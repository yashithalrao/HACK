chrome.runtime.onInstalled.addListener(() => {
    console.log("Web Accessibility Extension Installed!");
});

// Listens for messages from popup.js and forwards them to content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
                sendResponse(response);
            });
        });
        return true; 
    }
});