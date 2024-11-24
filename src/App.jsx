import Snowfall from "react-snowfall";
import "./App.css";
import Abacus from "./components/abacus/Abacus";
import { useState, useEffect } from "react";
import Fish from "./components/fish/Fish";
import DialogueBox from "./components/dialogue box/DialogueBox ";
import ModeToggleModal from "./components/helperComponents/ModeToggleButton";
import { useMode } from "./context/ModeContext";
import Turtle from "./components/turtle/Turtle";

function App() {
  const [result, setResult] = useState(0);
  const { mode } = useMode(); // Access global mode state
  const [transitioning, setTransitioning] = useState(false); // Track transitions
  const [currentBg, setCurrentBg] = useState("default"); // Current background
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Get dynamic background styles
  const getBackgroundStyle = (bgMode) => {
    switch (bgMode) {
      case "SF":
        return {
          backgroundColor: "#1e40af",
          backgroundImage: "url('/aqua bg.jpeg')",
        };
      case "BF":
        return {
          backgroundColor: "#f97316",
          backgroundImage: "url('/turtlebg.jpeg')",
        };
      default:
        return {
          backgroundColor: "#42a1c6",
          backgroundImage: "url('/mainbg.png')",
        };
    }
  };

  // Handle transitions when the mode changes
  useEffect(() => {
    if (mode !== currentBg) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentBg(mode); // Change the background
        setTransitioning(false);
      }, 1000); // Match fade duration
    }
  }, [mode, currentBg]);

  return (
    <section
      className={`bg-no-repeat bg-cover w-full h-[200dvh] ${
        transitioning ? "fade-out" : "fade-in"
      }`}
      style={getBackgroundStyle(currentBg)}
    >
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
        <div className="flex justify-center items-center gap-x-24">
          <img
            className="w-[50%] lg:w-[25rem] mt-3 lg:translate-x-[20%] translate-x-[5%]"
            src="/logomian.png"
            alt="Logo"
          />
          <button
            onClick={openModal}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <svg
              fill="#000"
              height="24"
              width="24"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571..." />
                <path d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7s7,3.141,7,7S30.859,34,27,34z" />
              </g>
            </svg>
          </button>
        </div>
        <div className="rounded-2xl shadow max-w-fit py-3 px-4 mx-auto mt-14 bg-white ">
          <span className="text-[#1e40af] font-bold text-3xl ">
            Result: {result}
          </span>
        </div>

        {/* Render Turtle or Fish based on mode */}
        <section className="relative h-[40rem] mt-10">
          {mode === "SF" && (
            <main className="flex justify-center">
                <Fish>
                <DialogueBox content="Hello! I'm Finny the Fish in SF Mode" />
                </Fish>
            </main>
          )}
          {mode === "BF" && (
            <Turtle>
              <DialogueBox content="Hello! I'm Shelly the Turtle in BF Mode" />
            </Turtle>
          )}
          {!mode && (
            <main className=" flex justify-center">
                <DialogueBox content="Welcome! Please select a mode to begin." />
            </main>
          )}
          <main className={`mt-[${mode ==='BF'?  '20rem' : '10rem'}] flex justify-center mx-auto`}>
            <Abacus setResult={setResult} />
          </main>
        </section>

        {/* Modal */}
        <ModeToggleModal isOpen={isModalOpen} onClose={closeModal} />
      </section>
    </section>
  );
}

export default App;
