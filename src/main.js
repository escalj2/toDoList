//

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Function to create the main window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,  // Security reasons
            contextIsolation: true,  // Ensure no direct access to Node.js
        }
    });

    // Load the main HTML file
    mainWindow.loadFile('src/index.html');

    // Open dev tools automatically (if needed)
    // mainWindow.webContents.openDevTools();
}

// When Electron is ready, create the window
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit the app when all windows are closed
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// Handling modal opening from renderer (via IPC)
ipcMain.on('openModal', (event) => {
    // Code to open modal window (optional if you want new window)
});
