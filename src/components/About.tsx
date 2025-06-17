import { useState } from "react";
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation('about');
  const [isOpen, setIsOpen] = useState(false);
  const [locked, setLocked] = useState(false);

  function handleMouseEnter() {
    if (!locked) {
      setIsOpen(true);
    }
  }

  function handleMouseLeave() {
    if (!locked) {
      setIsOpen(false);
    }
  }

  function handleClick() {
    if (isOpen && !locked) {
      setLocked(true);
    } else if (isOpen && locked) {
      setLocked(false);
      setIsOpen(false);
    }
  }

  const skillsArray = t('skills', { returnObjects: true }) as string[];

  return (
    <>
      <div className="item fill button Skills title2" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onClick={handleClick}>
        <h2>{t('skillsTitle')}</h2>
      </div>
      <div className="item about">
        <p >{t('about')} </p>
      </div>
      <div className={`skillsdrop ${isOpen ? 'grow' : 'shrink'}`}>
        {skillsArray.map((skill, index) => (
          <p
            key={index}
            className={` item tag skills ${'skilldrop'+index}`}

          >
            {skill}
          </p>
        ))}
      </div>
    </>
  );
}
export default About;