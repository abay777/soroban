import React, { useEffect, useState } from "react";
import "./fish.css";

const Fish = ({ children, triggerMovement }) => {
  const [animationClass, setAnimationClass] = useState("start-left"); // Start with intro animation
  const [isAtFinalPosition, setIsAtFinalPosition] = useState(false); // Track if fish is in final position

  useEffect(() => {
    if (triggerMovement === "start-left") {
      // Intro animation
      setAnimationClass("start-left");
      setTimeout(() => {
        setAnimationClass("at-dialogue"); // Stay at the final position
        setIsAtFinalPosition(true);
      }, 2000); // Match intro animation duration
    } else if (triggerMovement === "oscillate") {
      if (isAtFinalPosition) {
        // Oscillating animation while keeping the static position
        setAnimationClass("at-dialogue oscillate");
        setTimeout(() => {
          setAnimationClass("at-dialogue"); // Return to static position
        }, 3000); // Match oscillate duration
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
      <div className="flex absolute top-0 w-[13rem] max-w-[333px] right-0 md:right-0 lg:right-[13.5%] xl:right-[25%] md:w-auto">
        {children}
      </div>
      {/* Bubbles */}
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
