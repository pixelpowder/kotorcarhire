'use client';
import { createContext, useContext } from 'react';
import { DEFAULT_LANG } from './languages';

const LanguageContext = createContext(DEFAULT_LANG);

export function useLanguage() {
  return useContext(LanguageContext);
}

export { LanguageContext };
export default LanguageContext;
