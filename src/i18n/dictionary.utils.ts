import { Locale } from "@/constants/i18n/locale.enum";

const dictionaries = {
  [Locale.EN_US]: () =>
    import("./locales/en-US.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
