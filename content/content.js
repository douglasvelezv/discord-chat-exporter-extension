
// Content script para extraer mensajes de Discord
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getChannelInfo') {
        const channelName = document.querySelector('[class*="title"]')?.textContent || 'Canal';
        const url = window.location.href;
        sendResponse({ name: channelName, url });
    }
    
    else if (request.action === 'extractMessages') {
        extractMessages(request, sendResponse);
    }
});

function extractMessages(request, sendResponse) {
    try {
        const messages = [];
        const messageElements = document.querySelectorAll('[class*="message"]');
        
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        
        messageElements.forEach(element => {
            const text = element.textContent;
            const author = element.querySelector('[class*="username"]')?.textContent || 'Unknown';
            const timestamp = element.getAttribute('data-timestamp') || new Date().toISOString();
            
            const msgDate = new Date(timestamp);
            
            if (msgDate >= startDate && msgDate <= endDate) {
                messages.push({
                    author,
                    content: text,
                    timestamp,
                    date: msgDate.toLocaleDateString('es-ES')
                });
            }
        });
        
        // Format data based on export format
        let data = messages;
        
        if (request.format === 'csv') {
            data = convertToCSV(messages);
        } else if (request.format === 'html') {
            data = convertToHTML(messages);
        } else if (request.format === 'xlsx') {
            data = convertToJSON(messages);
        } else {
            data = JSON.stringify(messages, null, 2);
        }
        
        sendResponse({ success: true, data });
    } catch (error) {
        sendResponse({ success: false, error: error.message });
    }
}

function convertToCSV(messages) {
    let csv = 'Autor,Mensaje,Fecha,Hora\n';
    messages.forEach(msg => {
        const date = new Date(msg.timestamp);
        csv += `"${msg.author}","${msg.content}","${msg.date}","${date.toLocaleTimeString('es-ES')}"
`;
    });
    return csv;
}

function convertToHTML(messages) {
    let html = '<html><head><meta charset="utf-8"><title>Discord Export</title><style>body{font-family:Arial}table{border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}</style></head><body><table><tr><th>Autor</th><th>Mensaje</th><th>Fecha</th></tr>';
    messages.forEach(msg => {
        html += `<tr><td>${msg.author}</td><td>${msg.content}</td><td>${msg.date}</td></tr>`;
    });
    html += '</table></body></html>';
    return html;
}

function convertToJSON(messages) {
    return JSON.stringify(messages, null, 2);
}

console.log('Content script cargado');
