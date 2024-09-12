const { contextBridge, ipcRenderer } = require('electron');

// Expose specific APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Function to send an "add list" request to the main process
    addList: () => ipcRenderer.send('add-list'),
    // Function to send a "delete list" request to the main process
    deleteList: () => ipcRenderer.send('delete-list')
});
