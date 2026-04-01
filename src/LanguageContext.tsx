import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "../lib/translations";
import { useFirebase } from "./FirebaseContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { user } = useFirebase();
  const [language, setLanguageState] = useState<Language>("en");

  // Load preference from Firestore
  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((snapshot) => {
        if (snapshot.exists() && snapshot.data().language) {
          setLanguageState(snapshot.data().language as Language);
        }
      });
    }
  }, [user]);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { language: lang }, { merge: true });
    }
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current && current[key]) {
        current = current[key];
      } else {
        return path; // Fallback to path if not found
      }
    }
    
    return typeof current === "string" ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
