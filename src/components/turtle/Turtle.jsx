import React, { useEffect, useState } from "react";
import "./turtle.css";

const Turtle = ({ children, isIntro }) => {
  const [animationClass, setAnimationClass] = useState("at-final"); // Default state

  useEffect(() => {
    if (isIntro) {
      // Trigger intro animation
      setAnimationClass("intro");
      const timer = setTimeout(() => {
        // Set turtle to static position after intro
        setAnimationClass("at-final");
      }, 2000); // Match the CSS animation duration
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isIntro]);

  useEffect(() => {
    if (!isIntro) {
      // Ensure turtle remains at its final position on new question
      setAnimationClass("at-final");
    }
  }, [children]); // Re-run when dialogue box content changes

  return (
    <section className="relative">
      <div className={`turtle ${animationClass}`}>
        <div className="head skin">
          <div className="teye"></div>
        </div>
        <div className="tail skin"></div>
        <div className="shell">
          <div className="pattern"></div>
        </div>
        <div className="frontLeftArm skin"></div>
        <div className="frontRightArm"></div>
        <div className="backLeftArm skin"></div>
        <div className="backRightArm"></div>
      </div>
      <main className="absolute md:left-1/2 -top-10 w-[13rem] max-w-[333px] lg:top-2 lg:w-max text-wrap">
        {children}
      </main>
    </section>
  );
};

export default Turtle;
