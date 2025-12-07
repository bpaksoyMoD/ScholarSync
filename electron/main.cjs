const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs'),
        },
        titleBarStyle: 'hiddenInset', // Mac-style seamless title bar
        vibrancy: 'under-window', // Glass effect on macOS
        visualEffectState: 'active',
    });

    // Load the Vite dev server URL or the built index.html
    const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:5173';
    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function startBackend() {
    const backendPath = path.join(__dirname, '../backend/server.js');
    backendProcess = spawn('node', [backendPath], {
        stdio: 'inherit',
        env: { ...process.env, PORT: 3001 }
    });

    backendProcess.on('error', (err) => {
        console.error('Failed to start backend:', err);
    });
}

app.on('ready', () => {
    startBackend();
    createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('will-quit', () => {
    if (backendProcess) {
        backendProcess.kill();
    }
});
