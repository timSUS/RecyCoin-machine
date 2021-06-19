import i18n from "i18next";
import {
  createState,
  StateMethods,
  StateMethodsDestroy,
} from "@hookstate/core";

export const isMobileGlobal: StateMethods<boolean> & StateMethodsDestroy =
  createState(window.innerWidth < 768 ? true : false);

export const languageGlobal: StateMethods<string> & StateMethodsDestroy =
  createState(
    i18n.language || window.localStorage.i18nextLng || window.navigator.language
      ? ((
          i18n.language ||
          window.localStorage.i18nextLng ||
          window.navigator.language
        ).slice(0, 2) as string)
      : "en",
  );

export const isDisabledGlobal = createState(false);
