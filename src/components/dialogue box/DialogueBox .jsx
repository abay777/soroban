import React from "react";
import './dialogue.css'

const DialogueBox = ({content}) => {
  return (
  
<div class="bubble bubble-bottom-left font-bold tracking-wide text-wrap md:text-base text-sm lg:mt-0 mt-6" contenteditable>{content}</div>
  );
};

export default DialogueBox;
