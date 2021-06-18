import "v8-compile-cache";
import "source-map-support/register";
import path from "path";
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import express, { Express } from "express";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

type SetupServerListening = () => void;

const server: Express = express();
server.use(express.static(path.join(__dirname, "..", "static")));
server.use("/renderer", express.static(path.join(__dirname, "..", "renderer")));
let port: number = 5000;

let mainWindow: BrowserWindow | null;

const gotTheLock: boolean = app.requestSingleInstanceLock();

const setupServerListening: SetupServerListening = (): void => {
  server.listen(port).on("error", (): void => {
    port++;
    setupServerListening();
  });
};

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (): void => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });
  app.on("ready", (): void => {
    process.env.DEVELOPMENT && installExtension(REACT_DEVELOPER_TOOLS);
    setupServerListening();
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 320,
      minHeight: 400,
      show: false,
      frame: false,
      webPreferences: {
        enableRemoteModule: true,
        contextIsolation: true,
        preload: path.join(__dirname, "..", "preload", "index.js"),
      },
    });
    mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.on("ready-to-show", (): void => {
      ipcMain.on("toggleDevTools", (): void => {
        mainWindow?.webContents.toggleDevTools();
      });
      mainWindow?.show();
    });
  });
}
