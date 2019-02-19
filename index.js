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
  const results = await Promise.all(videosWithDuration)
  mainWindow.webContents.send('metadata:complete', results)
})

ipcMain.on('conversion:start', (event, videos) => {
  videos.forEach((video => {
    const outputDirectory = video.path.split(video.name)[0]
    const outputName = video.name.split('.')[0]
    
    const outputPath = outputDirectory + outputName + '.' + video.format

    ffmpeg(video.path)
      .output(outputPath)
      .on(
        'end', 
        () => mainWindow.webContents.send('conversion:end', { video, outputPath })
      )
      .run()
  }))
})