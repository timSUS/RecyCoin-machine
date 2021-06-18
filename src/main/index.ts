import "v8-compile-cache";
import "source-map-support/register";
import path from "path";
import { app, BrowserWindow } from "electron";
import express, { Express } from "express";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

const server: Express = express();
server.use(express.static(path.join(__dirname, "..", "public")));
server.use("/renderer", express.static(path.join(__dirname, "..", "static")));
let port: number = 5000;

let mainWindow: BrowserWindow | null;

const gotTheLock: boolean = app.requestSingleInstanceLock();

const setupServerListening = (): void => {
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
    installExtension(REACT_DEVELOPER_TOOLS);
    setupServerListening();
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 320,
      minHeight: 400,
      show: false,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, "..", "preload", "preload.js"),
      },
    });
    mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.on("ready-to-show", (): void => {
      mainWindow?.show();
    });
  });
}
