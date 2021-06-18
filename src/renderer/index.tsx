import App from "~renderer/components/App/App";
import { StrictMode } from "react";
import { render } from "react-dom";
import initTranslation from "~renderer/utils/initTranslation/initTranslation";
import { i18n as TranslationType } from "i18next";
import Mousetrap from "mousetrap";

if (process.env.DEVELOPMENT) {
  const {
    getLCP,
    getFID,
    getCLS,
    getFCP,
    getTTFB,
  }: typeof import("web-vitals") = await import("web-vitals");
  // eslint-disable-next-line no-console
  getLCP(console.log);
  // eslint-disable-next-line no-console
  getFID(console.log);
  // eslint-disable-next-line no-console
  getCLS(console.log);
  // eslint-disable-next-line no-console
  getFCP(console.log);
  // eslint-disable-next-line no-console
  getTTFB(console.log);
}

if (window.api.isElectron) {
  Mousetrap.bind("f12", (): void => {
    window.api.toggleDevelopmentTools && window.api.toggleDevelopmentTools();
  });
  Mousetrap.bind("r", (): void => {
    window.api.reload && window.api.reload();
  });
  Mousetrap.bind("shift+r", (): void => {
    window.api.hardReload && window.api.hardReload();
  });
}

const root: HTMLElement | null = document.querySelector("#root");
const tranlation: TranslationType = await initTranslation();
render(
  <StrictMode>
    <App translation={tranlation} />
  </StrictMode>,
  root,
);
