import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
export const ModeContext = createContext();

// Context Provider Component
export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(null); // Default mode is SF

  // Log whenever the mode changes
  useEffect(() => {
    console.log(`Mode has been changed to: ${mode || "No Mode Selected"}`);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

// Custom Hook to Use Mode Context
export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
