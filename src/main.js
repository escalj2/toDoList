const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let newWindow;

// Function to create the main window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.webContents.openDevTools(); // Optional: Open DevTools for debugging
}

// Function to create a new blank window
function createNewWindow() {
    newWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    newWindow.loadFile(path.join(__dirname, 'newlist.html')); // Load the blank interface

    newWindow.webContents.openDevTools(); // Optional: Open DevTools for debugging
}

// Event listener for when the app is ready
app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// IPC event handlers
ipcMain.on('add-list', () => {
    console.log('Add list request received');
    createNewWindow(); // Open a new window when "Add List" is clicked
});

ipcMain.on('delete-list', () => {
    console.log('Delete list request received');
    // Do nothing for now
});
