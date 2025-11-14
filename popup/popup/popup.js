
// Tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Load channel info from Discord
async function loadChannelInfo() {
    try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const tab = tabs[0];
        
        if (!tab.url.includes('discord.com')) {
            document.getElementById('channelName').textContent = 'Abre Discord';
            return;
        }
        
        chrome.tabs.sendMessage(tab.id, { action: 'getChannelInfo' }, (response) => {
            if (response && response.name) {
                document.getElementById('channelName').textContent = response.name;
                document.getElementById('channelUrl').textContent = response.url || 'discord.com';
            }
        });
    } catch (error) {
        console.log('Channel info error:', error);
    }
}

// Export handler
document.getElementById('exportBtn').addEventListener('click', async () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const format = document.getElementById('exportFormat').value;
    const statusDiv = document.getElementById('status');
    
    if (!startDate || !endDate) {
        showStatus('Selecciona rango de fechas', 'error');
        return;
    }
    
    showStatus('Exportando...', 'loading');
    
    try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const tab = tabs[0];
        
        if (!tab.url.includes('discord.com')) {
            showStatus('Discord no abierto', 'error');
            return;
        }
        
        chrome.tabs.sendMessage(tab.id, {
            action: 'extractMessages',
            startDate,
            endDate,
            format
        }, (response) => {
            if (response && response.success) {
                chrome.runtime.sendMessage({
                    action: 'downloadData',
                    data: response.data,
                    format: format,
                    filename: `discord-export-${new Date().toISOString().split('T')[0]}`
                }, () => {
                    showStatus('Exportaci'n completada', 'success');
                });
            } else {
                showStatus('Error: ' + (response?.error || 'Desconocido'), 'error');
            }
        });
    } catch (error) {
        showStatus('Error: ' + error.message, 'error');
    }
});

function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = 'status-message ' + type;
}

function setDefaultDates() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    document.getElementById('startDate').valueAsDate = thirtyDaysAgo;
    document.getElementById('endDate').valueAsDate = today;
}

window.addEventListener('DOMContentLoaded', () => {
    loadChannelInfo();
    setDefaultDates();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateStatus') {
        showStatus(request.message, request.type);
    }
});
