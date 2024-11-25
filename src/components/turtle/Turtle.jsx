import React from "react";
import './turtle.css'

const Turtle = ({children}) => {
  return (
    <section>
      <div class="turtle">
        <div class="head skin">
          <div class="eye"></div>
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
    </section>
  );
};

export default Turtle;
