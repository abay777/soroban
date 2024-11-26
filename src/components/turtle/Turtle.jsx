import React, { useEffect, useState } from "react";
import './turtle.css';

const Turtle = ({ children, isIntro }) => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isIntro) {
      setAnimationClass("intro"); // Apply intro animation class if isIntro is true
      // Remove the intro class after animation to allow future animations
      const timer = setTimeout(() => setAnimationClass(""), 2000); // Match the animation duration
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isIntro]);

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
      <main className="absolute md:left-1/2 -top-10 w-[13rem] lg:top-2 lg:w-max text-wrap">
        {children}
      </main>
    </section>
  );
};

export default Turtle;
