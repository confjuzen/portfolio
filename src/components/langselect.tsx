import { useState } from "react";
import { useTranslation } from "react-i18next";

const Langselect = () => {
  const { i18n } = useTranslation();
  const [lockedIsEn, setLockedIsEn] = useState(true);
  const [hoverIsEn, setHoverIsEn] = useState(null);

  function handleClick(isEn: boolean) {
    setLockedIsEn(isEn);
    i18n.changeLanguage(isEn ? 'en' : 'fr');
  }

  function handleMouseEnter(isEn: boolean) {
    setHoverIsEn(isEn as unknown as null);
    i18n.changeLanguage(isEn ? 'en' : 'fr');
  }
  function handleMouseLeave() {
    setHoverIsEn(null);
    i18n.changeLanguage(lockedIsEn ? 'en' : 'fr');
  }

  const currentIsEn = hoverIsEn !== null ? hoverIsEn : lockedIsEn;

  return (
    <div className="Langselect">
      <a
        href="#"
        className={`link item fill ${currentIsEn ? 'selected' : ''}`}
        onClick={(e) => { e.preventDefault(); handleClick(true); }}
        onMouseEnter={() => handleMouseEnter(true)}
        onMouseLeave={handleMouseLeave}
      >
        EN
      </a>
      <a
        href="#"
        className={`link item fillr ${!currentIsEn ? 'selected' : ''}`}
        onClick={(e) => { e.preventDefault(); handleClick(false); }}
        onMouseEnter={() => handleMouseEnter(false)}
        onMouseLeave={handleMouseLeave}
      >
        FR
      </a>
    </div>
  );
}

export default Langselect;
