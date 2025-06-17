import { useTranslation } from "react-i18next";
import { useState } from "react";

const Webdev: React.FC = () => {
  const { t } = useTranslation("webprojects");
  const projects = Object.values(t("webprojects", { returnObjects: true }));

  const [isOpen, setIsOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [ tempIndex, setTempIndex ] = useState<number | null>(null);

  function handleMouseEnter(index: number) {
    if (!locked) {
      setIsOpen(true);
      setSelectedIndex(index);
    }
    if (locked) {
      setTempIndex(selectedIndex);
      setSelectedIndex(index);
    }
  }

  function handleMouseLeave() {
    if (!locked) {
      setIsOpen(false);
      setSelectedIndex(null);
    }
    if (locked) {
      setSelectedIndex(tempIndex);
    }
  }

  function handleClick(index: number) {
    if (isOpen && !locked) {
      setLocked(true);
      setTempIndex(index)
      setSelectedIndex(index);
    } else if (isOpen && locked) {
      setSelectedIndex(index);
      setTempIndex(index);
    } else if (isOpen && locked && selectedIndex === index) {
      setLocked(false);
      setSelectedIndex(null);
      setTempIndex(null);
    } 
  }

  return (
    <>
      <div className={"webProjects"}>
        {projects.map((project, index) => (
          <h3
            key={index}
            className={`fill item link ${"drop" + index} ${
              selectedIndex === index ? "open" : ""
            }`}
            rel="noopener noreferrer"
            onMouseLeave={handleMouseLeave}
            onMouseEnter={()=>handleMouseEnter(index)}
            onClick={()=>handleClick(index)}
          >
            {project.title}
          </h3>
        ))}
      </div>

      {selectedIndex !== null && (
        <>
          <div className={`img1 item ${isOpen ? "grow" : "shrink"}`}>
              <img
                className={"img1i"}
                src={projects[selectedIndex].img1}
                alt={projects[selectedIndex].title}
              />
            
          </div>
          <div className={`img2 item ${isOpen ? "grow" : "shrink"}`}>
              <img
                className={"img2i"}
                src={projects[selectedIndex].img2}
                alt={projects[selectedIndex].title}
              />
            
          </div>
          <div className={`img3 item ${isOpen ? "grow" : "shrink"}`}>
              <img
                className={"img3i"}
                src={projects[selectedIndex].img3}
                alt={projects[selectedIndex].title}
              />
          </div>
          <div className="tagsline">
            {projects[selectedIndex].tags.map((tag: string, index: number) => (
              <div key={index} className="tag item">
                {tag}
              </div>
            ))}

          </div>
          <div className={`discription item ${isOpen ? "grow" : "shrink"}`}>
            <h2>{projects[selectedIndex].discriptiontitle}</h2>
            <p>{projects[selectedIndex].discription}</p>
            <p>{projects[selectedIndex].difficulties}</p>
          </div>
          <a href={projects[selectedIndex].url} className="github item">GitHub</a>
        </>
      )}
    </>
  );
};
export default Webdev;
