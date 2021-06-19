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
const isDevelopment: boolean = process.env.DEVELOPMENT as unknown as boolean;

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
    isDevelopment && installExtension(REACT_DEVELOPER_TOOLS);
    setupServerListening();
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 320,
      minHeight: 400,
      show: false,
      frame: isDevelopment,
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
      ipcMain.on("reload", (): void => {
        mainWindow?.webContents.reload();
      });
      ipcMain.on("hardReload", (): void => {
        app.relaunch();
        app.quit();
      });
      mainWindow?.maximize();
      mainWindow?.show();
    });
  });
}
