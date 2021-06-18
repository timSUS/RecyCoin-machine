import i18next, {
  i18n as TranslationType,
  InitOptions,
  Module,
  ThirdPartyModule,
} from "i18next";
import i18nextDetector from "i18next-browser-languagedetector";
import i18nextBackend from "i18next-xhr-backend";
import translationsOptions from "~utils/translationOptions/translationOptions";

type InitTranslation = () => Promise<TranslationType>;
type SetupTranslation = <T extends Module>(
  translation: TranslationType,
  options: InitOptions,
  ...modules: T[]
) => Promise<TranslationType>;

const fixedI18NextDetector: ThirdPartyModule =
  i18nextDetector as unknown as ThirdPartyModule;
const fixedI18NextBackend: ThirdPartyModule =
  i18nextBackend as unknown as ThirdPartyModule;

export const setupTranslation: SetupTranslation = async <T extends Module>(
  translation: TranslationType,
  options: InitOptions,
  ...modules: T[]
): Promise<TranslationType> => {
  modules.forEach((module: T): void => {
    translation = translation.use(module);
  });
  await translation.init(options);
  return translation;
};

const initTranslation: InitTranslation = async (): Promise<TranslationType> => {
  return await setupTranslation(
    i18next,
    translationsOptions,
    fixedI18NextDetector,
    fixedI18NextBackend,
  );
};

export default initTranslation;
