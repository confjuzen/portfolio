import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Toby = () => {
  const { t } = useTranslation("projects");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  let projectId = "";
  if (!isHomePage) {
    const parts = location.pathname.split("/");
    if (parts.length >= 2) {
      projectId = parts[1];
    }
  }

  const projectTitle = projectId
    ? t(`projects.${projectId}.title`, { defaultValue: "Project" })
    : "";

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link
      className="item button fill title1"
      to="/"
      style={{ cursor: "pointer" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1>{isHomePage || isHovered ? "· TOBY FOSTER ·" : `· ${projectTitle} ·`}</h1>
    </Link>
  );
};

export default Toby;
