//import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
//
//const ScrollNavigation: React.FC = () => {
//  const navigate = useNavigate();
//  const pages = ["/", "/webdev", "/graphics"];
//
//  const [currentPageIndex, setCurrentPageIndex] = useState(0);
//  const [prevPageIndex, setPrevPageIndex] = useState<number | null>(null);
//
//  useEffect(() => {
//    if (currentPageIndex !== prevPageIndex) {
//      navigate(pages[currentPageIndex]);
//      setPrevPageIndex(currentPageIndex);
//    }
//  }, [currentPageIndex, prevPageIndex, navigate, pages]);
//
//  useEffect(() => {
//    const handleScroll = (event: WheelEvent) => {
//      if (event.deltaY > 0) {
//        setCurrentPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
//      } else {
//        setCurrentPageIndex(
//          (prevIndex) => (prevIndex - 1 + pages.length) % pages.length
//        );
//      }
//    };
//
//    window.addEventListener("wheel", handleScroll);
//
//    return () => {
//      window.removeEventListener("wheel", handleScroll);
//    };
//  }, [currentPageIndex, pages]);
//
//  return <></>;
//};
//
//export default ScrollNavigation;
