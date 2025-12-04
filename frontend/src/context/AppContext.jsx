import { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

useEffect(()=> {
    if(theme === 'dark'){
        document.documentElement.classList.add('dark');
    } else{
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme)
},[theme])

  const value = {
    theme,
    setTheme,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook for easy usage
export const useTheme = () => {
    return useContext(AppContext);
}

export default AppContext;