// ThemeToggle.jsx
import React from "react";

const ThemeToggle = ({ theme, setTheme }) => {
  const isDark = theme === "dark";

  const handleChange = () => setTheme(isDark ? "light" : "dark");

  return (
    <div
      className="dark:text-white flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer"
      onClick={handleChange}
      role="button"
      aria-label="Toggle dark mode"
    >
      <div className="flex items-center gap-2 text-sm">
        <img
          src={/* assets.theme_icon */ "/icons/theme.svg"}
          className="w-4"
          alt=""
          aria-hidden="true"
        />
        <p>Dark Mode</p>
      </div>

      {/* using native input for accessibility */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isDark}
          onChange={handleChange}
          aria-checked={isDark}
          aria-label="Enable dark mode"
        />
        <div className="w-9 h-5 bg-gray-300 rounded-full peer-checked:bg-purple-600 transition-all" />
        <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
      </label>
    </div>
  );
};

export default ThemeToggle;
