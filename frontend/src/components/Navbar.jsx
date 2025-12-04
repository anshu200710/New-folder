import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/AppContext"; // adjust path if needed
import { assets } from "../assets/assets";

// Updated, dark-aware Navbar component
// Key improvements:
// - Uses theme-aware colors for backgrounds, borders and text
// - Switches logo based on theme (uses assets.logoLight / assets.logoDark)
// - Improves accessibility (escape to close mobile, descriptive aria labels)
// - Keeps animations smooth and consistent between themes

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  // Close mobile menu on ESC for better UX/accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Toggle theme and prevent event bubbling when used inside mobile panel
  const toggleTheme = (e) => {
    e?.stopPropagation();
    setTheme(isDark ? "light" : "dark");
  };

  // Logo fallback strategy:
  // - Prefer explicit light/dark assets if available (assets.logoLight, assets.logoDark)
  // - Otherwise use the single asset but rely on CSS invert when in dark mode
  const logoSrc = isDark ? assets.logoDark ?? assets.logo : assets.logoLight ?? assets.logo;

  return (
    <header className="w-full z-50">
      <div className="mx-auto border-b border-gray-200 dark:border-slate-800">
        <div className="flex py-4 items-center justify-between md:justify-evenly gap-8 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 md:px-14 shadow-sm">
          {/* left - logo */}
          <Link to="/" aria-label="Home" className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="logo"
              // if you only have one logo file that is dark on white, the 'invert' class will auto-invert it in dark mode
              className={`h-8 ${!assets.logoDark && !assets.logoLight ? "dark:invert" : ""}`}
            />
          </Link>

          {/* center - desktop nav (minimal) */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-800 dark:text-gray-100">
            <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Products
            </Link>
            <Link to="/pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Pricing
            </Link>
            <Link to="/docs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Docs
            </Link>
          </nav>

          {/* right - controls */}
          <div className="flex items-center gap-3">
            {/* theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            {/* desktop CTA */}
            <Link
              to="/login"
              className="hidden md:inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-500 transition"
            >
              Sign up
            </Link>

            {/* mobile menu button */}
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-over (right) */}
      <div className={`fixed inset-0 z-40 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 dark:bg-black/50 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* panel */}
        <aside
          className={`fixed top-0 right-0 h-full w-72 max-w-full bg-white dark:bg-slate-900 shadow-xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="logo"
                className={`h-6 ${!assets.logoDark && !assets.logoLight ? "dark:invert" : ""}`}
              />
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition">
              <X size={24} />
            </button>
          </div>

          <div className="px-4 py-6 space-y-4 text-gray-800 dark:text-gray-100">
            <Link to="/products" onClick={() => setOpen(false)} className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Products
            </Link>
            <Link to="/pricing" onClick={() => setOpen(false)} className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Pricing
            </Link>
            <Link to="/docs" onClick={() => setOpen(false)} className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Docs
            </Link>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme(e);
                }}
                className="w-full flex items-center justify-between gap-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                aria-label="Toggle dark mode"
              >
                <div className="flex items-center gap-2">
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  <span>Dark Mode</span>
                </div>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" className="sr-only peer" checked={isDark} readOnly aria-checked={isDark} />
                  <div className="w-9 h-5 bg-gray-300 rounded-full peer-checked:bg-purple-600 transition-all" />
                  <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                </div>
              </button>

              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block mt-4 text-center bg-indigo-600 text-white px-4 py-2 rounded-full"
              >
                Sign up
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
