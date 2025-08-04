import { createContext, useContext } from "react";

// 移除语言切换功能，默认设置为英文
type Language = 'en';

interface LanguageContextType {
  language: Language;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 默认语言设置为英文，不提供切换功能
  return (
    <LanguageContext.Provider value={{ language: 'en' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}