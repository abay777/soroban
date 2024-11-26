import React, { useEffect, useState } from "react";
import "./fish.css";

const Fish = ({ children, triggerMovement }) => {
  const [animationClass, setAnimationClass] = useState("start-left"); // Default class to start animation
  const [isAtFinalPosition, setIsAtFinalPosition] = useState(false); // Track if fish is in final position

  useEffect(() => {
    if (triggerMovement === "start-left") {
      setAnimationClass("start-left"); // Apply movement for introduction
      setTimeout(() => {
        setAnimationClass("at-dialogue"); // Retain position after animation
        setIsAtFinalPosition(true); // Mark fish at final position
      }, 2000); // Match animation duration
    }

    if (triggerMovement === "oscillate") {
      if (isAtFinalPosition) {
        setAnimationClass("oscillate"); // Apply wiggling animation for questions
        setTimeout(() => {
          setAnimationClass("at-dialogue"); // Return to final position after wiggling
        }, 2000); // Match animation duration
      }
    }
  }, [triggerMovement, isAtFinalPosition]);

  return (
    <section>
      <div className={`fish ${animationClass}`}>
        <div className="fish-body">
          <div className="feye">
            <div className="pupil"></div>
          </div>
        </div>
        <div className="fin"></div>
        <div className="fin fin-bottom"></div>
      </div>
      <div className="flex absolute top-0 w-[13rem] right-0 md:right-0 lg:right-[14%] md:w-auto">
        {children}
      </div>
      <div className="bubbles bubble-1"></div>
      <div className="bubbles bubble-5"></div>
      <div className="bubbles bubble-2"></div>
      <div className="bubbles bubble-6"></div>
      <div className="bubbles bubble-3"></div>
      <div className="bubbles bubble-7"></div>
      <div className="bubbles bubble-4"></div>
      <div className="bubbles bubble-8"></div>
    </section>
  );
};

export default Fish;
