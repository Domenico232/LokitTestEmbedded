import { app, BrowserWindow } from 'electron';
import { SerialPort, ReadlineParser } from 'serialport';

let mainWindow: BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
    });

    mainWindow.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

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

const port = new SerialPort({ path: 'COM1', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data: string) => {
    mainWindow.webContents.send('serial-data', data);
});
