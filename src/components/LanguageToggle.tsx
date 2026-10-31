import type { ComponentType } from "react";
import { useTranslation, type Language } from "@/i18n/LanguageContext";

const GBFlag = () => (
  <svg viewBox="0 0 60 30" className="lang-switch__flag-svg" aria-hidden="true">
    <clipPath id="lang-gb">
      <path d="M0 0v30h60V0z" />
    </clipPath>
    <g clipPath="url(#lang-gb)">
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4" clipPath="url(#lang-gb)" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const ROFlag = () => (
  <svg viewBox="0 0 6 4" className="lang-switch__flag-svg" aria-hidden="true">
    <rect width="2" height="4" fill="#002B7F" />
    <rect x="2" width="2" height="4" fill="#FCD116" />
    <rect x="4" width="2" height="4" fill="#CE1126" />
  </svg>
);

const options: { code: Language; label: string; Flag: ComponentType }[] = [
  { code: "en", label: "EN", Flag: GBFlag },
  { code: "ro", label: "RO", Flag: ROFlag },
];

const LanguageToggle = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={language === "en" ? "Language" : "Limba"}
    >
      {options.map(({ code, label, Flag }) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={`lang-switch__option${isActive ? " lang-switch__option--active" : ""}`}
            aria-pressed={isActive}
            aria-label={code === "en" ? "English" : "Română"}
          >
            <span className="lang-switch__flag">
              <Flag />
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
