import React from "react";
import "./fish.css";

const Fish = ({children}) => {
  return (
    <section className="">
      <div class="fish">
        <div class="fish-body">
          <div class="feye">
            <div class="pupil"></div>
          </div>
        </div>
        <div class="fin"></div>
        <div class="fin fin-bottom"></div>
      </div>
      <div className="flex absolute top-0 w-[13rem] right-0 md:right-0 lg:right-[14%] md:w-auto">

      {children}
      </div>

      <div class="bubbles bubble-1"></div>
      <div class="bubbles bubble-5"></div>
      <div class="bubbles bubble-2"></div>
      <div class="bubbles bubble-6"></div>
      <div class="bubbles bubble-3"></div>
      <div class="bubbles bubble-7"></div>
      <div class="bubbles bubble-4"></div>
      <div class="bubbles bubble-8"></div>
    </section>
  );
};

export default Fish;
