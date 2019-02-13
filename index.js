const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    }
  })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)
})

ipcMain.on('videos:added', (event, videos) => {
  console.log(videos)
})