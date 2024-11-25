import React from "react";
import './dialogue.css'

const DialogueBox = ({content}) => {
  return (
  
<div class="bubble bubble-bottom-left" contenteditable>{content}</div>
  );
};

export default DialogueBox;
