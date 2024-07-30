const { app, BrowserWindow, ipcMain } = require('electron');
const { SerialPort } = require('serialport');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  // Protezione aggiuntiva
      enableRemoteModule: false,  // Disabilitare remote module
    }
  });

  win.loadFile('index.html');
  win.webContents.openDevTools(); // Apri i DevTools
}

app.whenReady().then(createWindow);

let port = new SerialPort({ path: 'COM2', baudRate: 9600 });

port.on('open', () => {
    port.write('connection from COM2\r\n', (err) => {
        if (err) {
            return console.error('Error on write: ', err.message);
        }
    });
console.log('Serial port connected COM2');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('button-click', (event, buttonNumber, state) => {
    const message = `Led${buttonNumber}${state}`;
    if (port) {
        port.write(message + '\r\n', (err) => {
        if (err) {
            return console.error('Errore durante la scrittura sulla porta seriale:', err.message);
        }
        console.log('Messaggio inviato alla porta seriale:', message);
        });
    }
});
