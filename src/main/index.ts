import "v8-compile-cache";
import "source-map-support/register";
import { join } from "path";
import { app, BrowserWindow, ipcMain, Menu, screen } from "electron";
import express, { Express } from "express";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

type SetupServerListening = () => void;

const server: Express = express();
server.use(express.static(join(__dirname, "..", "static")));
server.use("/renderer", express.static(join(__dirname, "..", "renderer")));
server.get("*", (_request, response) => {
  response.sendFile(join(__dirname, "..", "static", "index.html"));
});
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
    const screenSize = screen.getPrimaryDisplay().size;
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: screenSize.width,
      minHeight: screenSize.height,
      show: false,
      frame: isDevelopment,
      resizable: false,
      webPreferences: {
        enableRemoteModule: true,
        contextIsolation: true,
        preload: join(__dirname, "..", "preload", "index.js"),
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
