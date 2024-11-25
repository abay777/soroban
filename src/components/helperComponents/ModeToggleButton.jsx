import React from "react";
import { useMode } from "../../context/ModeContext";

const ModeToggleModal = ({ isOpen, onClose }) => {
  const { mode, setMode } = useMode();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center " style={{zIndex:100}}>
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-xs">
        <h2 className="text-xl font-bold mb-4 text-[#1e40af]">Select Mode</h2>
        <p className="mb-6 text-gray-600">
          Current Mode:{" "}
          <span className="font-bold text-[#1e40af]">
            {mode || "No Mode Selected"}
          </span>
        </p>
        <div className="space-y-4">
          <button
            onClick={() => {
              setMode(null); // Reset to no mode
              onClose();
            }}
            className={`w-full py-2 ${
              !mode
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } font-bold rounded-md transition`}
          >
            No Mode
          </button>
          <button
            onClick={() => {
              setMode("SF");
              onClose();
            }}
            className={`w-full py-2 ${
              mode === "SF"
                ? "bg-blue-700 text-white"
                : "bg-[#1e40af] text-white hover:bg-blue-800"
            } font-bold rounded-md transition`}
          >
            SF Mode
          </button>
          <button
            onClick={() => {
              setMode("BF");
              onClose();
            }}
            className={`w-full py-2 ${
              mode === "BF"
                ? "bg-orange-600 text-white"
                : "bg-[#f97316] text-white hover:bg-orange-700"
            } font-bold rounded-md transition`}
          >
            BF Mode
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 underline hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModeToggleModal;
