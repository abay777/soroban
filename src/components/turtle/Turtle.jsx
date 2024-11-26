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
      <main className="absolute md:left-1/2 -top-10  w-[13rem] lg:top-2 lg:w-max text-wrap">
         {children}
      </main>
    </section>
  );
};

export default Turtle;
