const electron = require('electron')
const {app, BrowserWindow, Menu} = electron
const path = require('path')
const url = require('url')

// Template for the Menu
menuTemplate = [
  {
    label: 'Application',
    submenu: [
      {
        label: 'Menu',
        click: () => {
          openMenuWindow()
        }
      },
      {
        label: 'List',
        click: () => {
          openListWindow()
        }
      },
      {
        label: 'About',
        click: () => {
          openAboutWindow()
        }
      }
    ]
  }
]

// Keep a global reference so the garbage collector does not destroy our app
let mainWindow

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 550
  })

  // Load the index.html file
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Set up the menu
  var menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Opens the Menu window
function openMenuWindow() {

  let menuWindow = new BrowserWindow({
    parent: mainWindow,
    modal: false,
    show: false,
    width: 300,
    height: 200
  })
  menuWindow.loadURL(url.format({
    pathname: path.join(__dirname, ''),
    protocol: 'file:',
    slashes: false
  }))
  menuWindow.setMenu(null)
  menuWindow.once('ready-to-show', () => {
    menuWindow.show()
  })
}
// Opens the List window
function openListWindow() {

  let listWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 300,
    height: 500
  })
  listWindow.loadURL(url.format({
    pathname: path.join(__dirname, ''),
    protocol: 'file:',
    slashes: true
  }))
  listWindow.setMenu(null)
  listWindow.once('ready-to-show', () => {
    listWindow.show()
  })
}
// Opens the about window
function openAboutWindow() {

  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 300,
    height: 200
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'about.html'),
    protocol: 'file:',
    slashes: true
  }))
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
}

// Create the window then the app is ready
app.on('ready', () => {
  createWindow()
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore()
  })
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize()
  })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Reopen the app on macOS
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
