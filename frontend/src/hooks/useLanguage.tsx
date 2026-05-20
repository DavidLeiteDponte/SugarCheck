import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

// Banderas importación (si las usas)
import ES from "../assets/icons/ES.svg";
import JA from "../assets/icons/JA.svg";
import EN_US from "../assets/icons/EN-US.svg";
import PT from "../assets/icons/PT.svg";

const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "es");

  // Memoizar la función para evitar recreaciones innecesarias
  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
      localStorage.setItem("i18nextLng", lng);
      document.documentElement.lang = lng;
    },
    [i18n]
  );

  // Sincronizar el idioma cuando cambia en i18n
  useEffect(() => {
    const handleLanguageChanged = () => {
      setCurrentLanguage(i18n.language);
    };

    // Escuchar cambios de idioma
    i18n.on("languageChanged", handleLanguageChanged);

    // Configurar idioma inicial si no está establecido
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (savedLanguage && savedLanguage !== i18n.language) {
      changeLanguage(savedLanguage);
    }

    // Establecer atributo lang para accesibilidad
    document.documentElement.lang = i18n.language;

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n, changeLanguage]);

  // Configuración de idiomas disponibles
  const languages = useMemo(
    () => [
      {
        code: "es",
        name: "Español",
        flag: "🇪🇸",
        icon: ES,
      },
      {
        code: "en",
        name: "English",
        flag: "🇺🇸",
        icon: EN_US,
      },
      {
        code: "pt",
        name: "Português",
        flag: "🇵🇹",
        icon: PT,
      },
      {
        code: "ja",
        name: "日本語",
        flag: "🇯🇵",
        icon: JA,
      },
    ],
    []
  );

  // Encontrar el idioma actual basado en el código
  const currentLanguageInfo =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  // Verificar si un idioma está disponible
  const isLanguageAvailable = useCallback(
    (code: string) => {
      return languages.some((lang) => lang.code === code);
    },
    [languages]
  );

  // Cambiar al siguiente idioma disponible (útil para botones de toggle)
  const toggleLanguage = useCallback(() => {
    const currentIndex = languages.findIndex(
      (lang) => lang.code === currentLanguage
    );
    const nextIndex = (currentIndex + 1) % languages.length;
    changeLanguage(languages[nextIndex].code);
  }, [currentLanguage, languages, changeLanguage]);

  return {
    currentLanguage,
    currentLanguageInfo,
    changeLanguage,
    toggleLanguage,
    languages,
    isLanguageAvailable,
    t, // Atajo para traducciones
  };
};

export default useLanguage;
