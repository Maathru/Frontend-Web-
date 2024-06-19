import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "English" },
  { code: "sin", lang: "Sinhala" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {languages.map((lng) => {
        return (
          <Button
            className={lng.code === i18n.language ? "text-black" : ""}
            key={lng.code}
            onClick={() => changeLanguage(lng.code)}
          >
            {lng.lang}
          </Button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
