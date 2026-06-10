"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { type Locale, t as translate } from "./i18n";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "pt",
  setLocale: () => {},
  t: (key) => key,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("pixelai-locale") as Locale | null;
    if (saved && ["pt", "en", "es"].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    localStorage.setItem("pixelai-locale", newLocale);
  }

  function t(key: string) {
    return translate(locale, key);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
