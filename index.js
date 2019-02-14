const { app, BrowserWindow, ipcMain } = require('electron')
const ffmpeg = require('fluent-ffmpeg')

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

ipcMain.on('videos:added', async (event, videos) => {
  const videosWithDuration = videos.map(video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, data) => {
        if (err) { reject(err) }
        resolve({
          ...video,
          duration: data.format.duration,
          format: 'avi'
        })
      })
    })
  })
  await Promise.all(videosWithDuration)
  console.log(videosWithDuration)
  mainWindow.webContents.send('metadata:complete', videosWithDuration)
})