import React from "react";
import './turtle.css'

const Turtle = ({children}) => {
  return (
    <section className="relative ">
      <div class="turtle">
        <div class="head skin">
          <div class="teye"></div>
        </div>
        <div class="tail skin"></div>
        <div class="shell">
          <div class="pattern"></div>
        </div>
        <div class="frontLeftArm skin"></div>
        <div class="frontRightArm"></div>
        <div class="backLeftArm skin"></div>
        <div class="backRightArm"></div>
      </div>
      <main className="absolute -top-[19rem] right-[30%]">
         {children}
      </main>
    </section>
  );
};

export default Turtle;
