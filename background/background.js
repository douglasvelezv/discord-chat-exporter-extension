
// Service Worker - Maneja las descargas y comunicación

chrome.runtime.onInstalled.addListener(() => {
    console.log('Discord Chat Exporter instalado');
});

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'downloadData') {
        downloadData(request, sendResponse);
    }
});

function downloadData(request, sendResponse) {
    try {
        const { data, format, filename } = request;
        
        // Determine file extension and MIME type
        let fileExt, mimeType;
        
        if (format === 'csv') {
            fileExt = 'csv';
            mimeType = 'text/csv';
        } else if (format === 'html') {
            fileExt = 'html';
            mimeType = 'text/html';
        } else if (format === 'xlsx') {
            fileExt = 'xlsx';
            mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        } else {
            fileExt = 'json';
            mimeType = 'application/json';
        }
        
        // Create blob
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        // Trigger download
        chrome.downloads.download({
            url: url,
            filename: `${filename}.${fileExt}`,
            saveAs: true
        }, (downloadId) => {
            console.log('Descarga iniciada:', downloadId);
            sendResponse({ success: true });
        });
    } catch (error) {
        console.error('Error en descarga:', error);
        sendResponse({ success: false, error: error.message });
    }
}

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('discord.com')) {
        // Inyectar content script si es necesario
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content/content.js']
        }).catch(err => {
            console.log('Script ya inyectado o error:', err);
        });
    }
});

console.log('Service Worker cargado');
