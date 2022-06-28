import React, { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { themeSelector } from "state/selectors/theme";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "styles/appTheme";

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const themeMode = useRecoilValue(themeSelector);

  return <ThemeProvider theme={themes[themeMode]}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
