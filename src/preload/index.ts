import { contextBridge, ContextBridge, ipcRenderer } from "electron";
import isElectron from "is-electron";

const { exposeInMainWorld }: ContextBridge = contextBridge;

exposeInMainWorld("api", {
  isElectron: isElectron,
  toggleDevelopmentTools: process.env.DEVELOPMENT
    ? (): void => ipcRenderer.send("toggleDevTools")
    : undefined,
  reload: process.env.DEVELOPMENT
    ? (): void => ipcRenderer.send("reload")
    : undefined,
  hardReload: process.env.DEVELOPMENT
    ? (): void => ipcRenderer.send("hardReload")
    : undefined,
});
