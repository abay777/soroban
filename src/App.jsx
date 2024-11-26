import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import "./App.css";
import Fish from "./components/fish/Fish";
import DialogueBox from "./components/dialogue box/DialogueBox ";
import ModeToggleModal from "./components/helperComponents/ModeToggleButton";
import { useMode } from "./context/ModeContext";
import Turtle from "./components/turtle/Turtle";
import Abacus from "./components/abacus/Abacus";
import { FaGear } from "react-icons/fa6";

function App() {
  const [result, setResult] = useState(0); // Abacus result state
  const { mode } = useMode(); // Access global mode state
  const [dialogue, setDialogue] = useState(""); // Dialogue content
  const [triggerMovement, setTriggerMovement] = useState("start-left"); // Default to introduction movement
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Questions categorized by mode
  const SFQuestions = [
    {
      problem: "Add 4",
      hint: "Use the 5 bead and subtract 1 bead below!",
    },
  ];

  const BFQuestions = [
    {
      problem: "Add 7",
      hint: "Use the 5 bead and add 2 beads below!",
    },
  ];

  // Function to select a question based on the mode
  const askNewQuestion = () => {
    let randomQuestion;
    if (mode === "SF") {
      randomQuestion =
        SFQuestions[Math.floor(Math.random() * SFQuestions.length)];
    } else if (mode === "BF") {
      randomQuestion =
        BFQuestions[Math.floor(Math.random() * BFQuestions.length)];
    }
    setDialogue(`${randomQuestion.problem}. Hint: ${randomQuestion.hint}`);

    // Trigger oscillating animation for new questions
    setTriggerMovement("oscillate");
  };

  useEffect(() => {
    if (mode) {
      // Start with an introduction movement and message
      const introMessage =
        mode === "SF"
          ? "Hello! I'm Finny the Fish in SF Mode"
          : "Hello! I'm Shelly the Turtle in BF Mode";
      setDialogue(introMessage);

      // Trigger introduction movement
      setTriggerMovement("start-left");

      // Show the question after a 5-second delay
      setTimeout(() => {
        askNewQuestion();
      }, 5000); // Delay for introduction
    } else {
      setDialogue("Welcome! Please select a mode to begin.");
    }
  }, [mode]);

  return (
    <section className="relative w-full h-[200dvh]">
      {/* Background Layers */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          mode === "SF" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "#1e40af",
          backgroundImage: "url('/aqua bg.jpeg')",
          backgroundSize: "cover",
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          mode === "BF" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "#f97316",
          backgroundImage: "url('/turtlebg.jpeg')",
          backgroundSize: "cover",
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          !mode ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "#42a1c6",
          backgroundImage: "url('/mainbg.png')",
          backgroundSize: "cover",
        }}
      />

      <section>
        {/* Snowfall only when no mode is active */}
        {!mode && (
          <Snowfall
            color="#fff"
            radius={[0.5, 1.0]}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}
            snowflakeCount={100}
            changeFrequency={100}
            wind={[2, 5.0]}
            speed={[0.5, 1.0]}
          />
        )}
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-x-24 relative z-10">
          <img
            className="w-[50%] lg:w-[25rem] mt-3 lg:translate-x-[20%] translate-x-[5%]"
            src="/logomian.png"
            alt="Logo"
          />
          <button
            onClick={openModal}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <FaGear size={20} className="text-yellow-500" />
          </button>
        </div>
        <div className="rounded-2xl shadow max-w-fit py-3 px-4 mx-auto mt-6 bg-white relative z-10">
          <span className="text-[#1e40af] font-bold text-3xl ">
            Result: {result}
          </span>
        </div>

        {/* Render Fish or Turtle based on mode */}
        <section className="relative h-[40rem] mt-10">
          {mode === "SF" && (
            <main className="flex justify-center relative z-10">
              <Fish triggerMovement={triggerMovement}>
                <DialogueBox content={dialogue} />
              </Fish>
            </main>
          )}
          {mode === "BF" && (
            <main className="flex justify-center relative z-10">
              <Turtle isIntro={dialogue.includes("Shelly the Turtle")}>
                <DialogueBox content={dialogue} />
              </Turtle>
            </main>
          )}
          {!mode && (
            <main className="flex justify-center relative z-10">
              <DialogueBox content={dialogue} />
            </main>
          )}

          {/* Display Abacus */}
          {mode === "BF"?(
            <main className="mt-5 flex justify-center relative z-10">
              <Abacus setResult={setResult} />
            </main>
          ):mode==="SF"&&(
            <main className="mt-24 flex justify-center relative z-10">
            <Abacus setResult={setResult} />
          </main>

          )

          }
        </section>

        {/* Modal */}
        <ModeToggleModal isOpen={isModalOpen} onClose={closeModal} />
      </section>
    </section>
  );
}

export default App;
