import { contextBridge, ContextBridge, ipcRenderer } from "electron";
import isElectron from "is-electron";

const { exposeInMainWorld }: ContextBridge = contextBridge;

exposeInMainWorld("api", {
  isElectron: isElectron,
  toggleDevelopmentTools: !process.env.DEVELOPMENT
    ? (): void => ipcRenderer.send("toggleDevTools")
    : undefined,
});
