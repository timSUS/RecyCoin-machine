export {};

declare global {
  interface Window {
    api: {
      isElectron: boolean;
      toggleDevelopmentTools?: () => void;
    };
  }
}
