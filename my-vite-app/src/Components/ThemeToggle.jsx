import React, { useState, useEffect } from "react";
import "../Style/ThemeToggle.css";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={() => setDarkMode(!darkMode)}
        checked={darkMode}
      />
      <label htmlFor="check" className="toggle-label">
        <span className="toggle-icon sun">☀️</span>
        <span className="toggle-icon moon">🌙</span>
      </label>
    </div>
  );
}
