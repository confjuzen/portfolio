import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const Projects: React.FC = () => {
  const { t } = useTranslation('projects'); 
  const projects = Object.values(t('projects', { returnObjects: true }));

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

  return (
    <>
      <div className="item fill button Projects title2" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onClick={handleClick}>
        <h2>{t('projectsTitle')}</h2>
      </div>

      <div className={`Projectsdrop ${isOpen ? 'grow' : 'shrink'}`}>
        {projects.map((project, index) => (
          <Link
            key={index}
            className={`fill item link ${'drop' + index}`}
            to={project.url}
            rel="noopener noreferrer"
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            {project.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Projects;
