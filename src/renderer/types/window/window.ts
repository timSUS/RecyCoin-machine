export {};

declare global {
  interface Window {
    api: {
      isElectron: boolean;
      toggleDevelopmentTools?: () => void;
      reload?: () => void;
      hardReload?: () => void;
      isDevelopment: boolean;
    };
  }
}
