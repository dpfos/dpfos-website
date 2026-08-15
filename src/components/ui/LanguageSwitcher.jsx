import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "AR", name: "العربية" },
  { code: "es", label: "ES", name: "Español" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "la", label: "LA", name: "Latin" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const switcherRef = useRef(null);

  const currentLanguage =
    i18n.language?.split("-")[0] || "en";

  const current =
    languages.find(
      (language) => language.code === currentLanguage
    ) || languages[0];

  const handleChange = async (language) => {
    await i18n.changeLanguage(language);
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  return (
    <div
      className={`language-switcher ${open ? "is-open" : ""}`}
      ref={switcherRef}
    >
      <button
        type="button"
        className="language-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="language-globe" aria-hidden="true">
          ◎
        </span>

        <span className="language-current">
          {current.label}
        </span>

        <span className="language-chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      <div
        className="language-menu"
        role="listbox"
        aria-label="Select language"
      >
        {languages.map((language) => (
          <button
            key={language.code}
            type="button"
            role="option"
            aria-selected={currentLanguage === language.code}
            className={`language-option ${
              currentLanguage === language.code
                ? "active"
                : ""
            }`}
            onClick={() => handleChange(language.code)}
          >
            <span className="language-option-code">
              {language.label}
            </span>

            <span className="language-option-name">
              {language.name}
            </span>

            {currentLanguage === language.code && (
              <span className="language-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}