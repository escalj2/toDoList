const { contextBridge, ipcRenderer } = require('electron');

// Exposing a custom API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    addList: () => ipcRenderer.send('openModal'),
});
