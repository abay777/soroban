import React from "react";
import './dialogue.css'

const DialogueBox = ({content}) => {
  return (
  
<div class="bubble bubble-bottom-left font-bold tracking-wide text-wrap text-xl" contenteditable>{content}</div>
  );
};

export default DialogueBox;
