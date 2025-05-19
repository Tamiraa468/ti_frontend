import { createContext, useContext, useState } from "react";
import { ThemeType } from "./type";

type Props = {
  children: React.ReactNode;
};

const ThemeContext = createContext({
  theme: ThemeType.LIGHT,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(ThemeType.LIGHT);

  const toggleTheme = () => {
    setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
