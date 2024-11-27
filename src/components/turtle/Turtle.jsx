import React, { useEffect, useState } from "react";
import "./turtle.css";

const Turtle = ({ children, isIntro }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [animationClass, setAnimationClass] = useState("at-final"); // Default state

  useEffect(() => {
    // Function to check screen width
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    // Initial check
    checkScreenSize();

    // Add event listener to handle screen resize
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isIntro) {
      // Trigger intro animation for both screen sizes
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
  }, [children]);

  if (isSmallScreen) {
    // Render image for smaller screens
    return (
      <section className="relative">
        <img
          src="/turtle image.png" // Replace with the correct image path
          alt="Turtle"
          id="turtle"
          className={`w-[6rem] h-[6rem] mt-[4rem] ${animationClass}`} // Use animationClass for animation
        />
        <main className="absolute md:left-1/2 -top-10 w-[13rem] max-w-[333px] lg:top-2 lg:w-max text-wrap">
          {children}
        </main>
      </section>
    );
  }

  // Render CSS turtle for larger screens
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
