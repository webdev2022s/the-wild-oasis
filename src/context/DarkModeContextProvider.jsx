import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const DarkModeContextProvider = createContext();

const initialState = {
  darkMode: window.matchMedia("(prefers-color-scheme:dark)").matches,
};

function reducer(state, action) {
  switch (action.type) {
    case "darkModes":
      return { ...state, darkMode: action.payload };
    default:
      throw new Error("Unknown Action Type");
  }
}
function DarkModeProvider({ children }) {
  const [{ darkMode }, dispatch] = useReducer(reducer, initialState);
  const [isDarkMode, setDarkMode] = useLocalStorage(darkMode, "DARKMODE");

  function toggleDarkMode() {
    dispatch({ type: "darkModes", payload: setDarkMode((data) => !data) });
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  const value = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContextProvider.Provider value={value}>
      {children}
    </DarkModeContextProvider.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContextProvider);
  if (context === undefined) throw new Error("Context is out of range!");
  return context;
}

export { DarkModeProvider, useDarkMode };
