export type LanguagePrefix = "ru" | "en"; // дописать потом мультиязычность

export const NavigationHome: Record<LanguagePrefix, string> = {
  ru: "На главную",
  en: "Home",
};

export const NavigationConverter: Record<LanguagePrefix, string> = {
  ru: "К калькулятору",
  en: "Converter",
};

export const ConverterInput: Record<LanguagePrefix, string> = {
  ru: "У меня есть",
  en: "I have",
};

export const ConverterOutput: Record<LanguagePrefix, string> = {
  ru: "Я получу",
  en: "I will get",
};
