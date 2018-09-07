import { app, BrowserWindow } from "electron";
var PythonShell = require('python-shell');
import { enableLiveReload } from 'electron-compile';
enableLiveReload();

var options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    args: ['value1', 'value2', 'value3']
};

PythonShell.run('./engine/main.py', options, function (err, results) {
    if (err) throw err;

    console.log('results: %j', results);

    console.log('finished python processing');
});


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    mainWindow.loadFile('./src/index.html')

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

