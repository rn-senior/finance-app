/**
 * Basic Setting Variables Define
 */
export const BaseSetting = {
  name: "qury",
  displayName: "qury",
  appVersion: "1.0.2",
  defaultLanguage: "es",
  languageSupport: ["en", "es"],
  resourcesLanguage: {
    es: {
      translation: require("../lang/es.json"),
    },
    en: {
      translation: require("../lang/en.json"),
    },
  },
};
