import React, { PropsWithChildren } from "react";
import { useTheme } from "state/stores";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles/appTheme";

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const themeMode = useTheme();

  return <ThemeProvider theme={themes[themeMode]}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
