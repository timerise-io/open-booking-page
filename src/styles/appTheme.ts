import { DefaultTheme } from "styled-components";

const ERROR = "#EA4335";
const DARK = "#333333";
const LIGHT_GREY = "#F6F6F6";
const MAIN_GREY = "#E7E7E7";
const DARK_GRAY = "#999999";
const SUCCESS = "#34A853";
const WHITE = "#FFFFFF";
const WARNING = "#FE852F";
const SECONDARY_DARK = "#E7E7E7";
const PRIMARY_LIGHT_GRAY = "#F2F2F2";

const appTheme: DefaultTheme = {
  themeType: "light",

  borderRadius: "4px",

  spacing: "0.5rem",

  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.08)",

  colors: {
    error: ERROR,
    dark: DARK,
    lightGrey: LIGHT_GREY,
    mainGrey: MAIN_GREY,
    darkGrey: DARK_GRAY,
    success: SUCCESS,
    white: WHITE,
    warning: WARNING,
    primary: "#333333",
    primaryLight: PRIMARY_LIGHT_GRAY,
  },

  colorSchemas: {
    separator: "#e5e5e5",
    contextButton: {
      disabledText: DARK_GRAY,
    },
    button: {
      primary: {
        background: "#333333",
        backgroundActive: "#1a1a1a",
        backgroundDisabled: "#808080",
        text: WHITE,
      },
      secondary: {
        background: "unset",
        backgroundActive: "unset",
        backgroundDisabled: SECONDARY_DARK,
        text: DARK,
        border: "1px solid #D9D9D9",
      },
      danger: {
        background: ERROR,
        backgroundActive: "#d12a1c",
        backgroundDisabled: "#99534e",
        text: WHITE,
      },
      text: {
        background: "unset",
        backgroundActive: "unset",
        backgroundDisabled: SECONDARY_DARK,
        text: DARK,
        border: "none",
      },
    },
    iconButton: {
      primary: {
        color: "#333333",
        colorActive: "#141414",
        colorDisabled: DARK_GRAY,
      },
    },
    background: {
      primary: {
        color: WHITE,
      },
      secondary: {
        color: LIGHT_GREY,
      },
    },
    input: {
      background: WHITE,
      border: "#D9D9D9",
      borderHover: DARK_GRAY,
    },
    timeSlotButton: {
      available: {
        background: PRIMARY_LIGHT_GRAY,
        backgroundActive: WHITE,
        backgroundHover: "#E5E5E5",
        border: "transparent",
        borderActive: DARK_GRAY,
        text: DARK,
      },
      unavailable: {
        background: "unset",
        backgroundActive: "unset",
        backgroundHover: "unset",
        border: "transparent",
        borderActive: "transparent",
        text: DARK_GRAY,
      },
      selected: {
        background: "#E5E5E5",
        backgroundActive: PRIMARY_LIGHT_GRAY,
        backgroundHover: "#E5E5E5",
        border: "#333333",
        borderActive: "#333333",
        text: DARK,
      },
    },
    fileUpload: {
      backgroundColor: PRIMARY_LIGHT_GRAY,
    },
  },

  breakpoints: {
    sm: 540,
    md: 720,
    lg: 1200,
  },

  typography: {
    h1: {
      size: "1.25rem",
      weight: "700",
      lineHeight: "1.5rem",
    },
    h2: {
      size: "1.125rem",
      weight: "700",
      lineHeight: "1.625rem",
    },
    h3: {
      size: "0.9375rem",
      weight: "700",
      lineHeight: "1.125rem",
    },
    body: {
      size: "0.8125rem",
      weight: "400",
      lineHeight: "1.25rem",
    },
    label: {
      size: "0.6875rem",
      weight: "400",
      lineHeight: "0.8125rem",
    },
  },

  mediaBelow: (breakpoint: number) => `@media (max-width: ${breakpoint}px)`,
};

const lightTheme = { ...appTheme };

const darkTheme: DefaultTheme = {
  themeType: "dark",

  borderRadius: "4px",

  spacing: "0.5rem",

  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.08)",

  colors: {
    error: ERROR,
    dark: "#D9D9D9",
    lightGrey: LIGHT_GREY,
    mainGrey: MAIN_GREY,
    darkGrey: DARK_GRAY,
    success: SUCCESS,
    white: DARK,
    warning: WARNING,
    primary: "#D9D9D9",
    primaryLight: "#3E3E3E",
  },

  colorSchemas: {
    separator: "#333333",
    contextButton: {
      disabledText: "#535353",
    },
    button: {
      primary: {
        background: "#EAEAEA",
        backgroundActive: "#FAFAFA",
        backgroundDisabled: "#333333",
        text: "#333333",
        textDisabled: "#808080",
      },
      secondary: {
        background: "unset",
        backgroundActive: "unset",
        backgroundDisabled: SECONDARY_DARK,
        text: WHITE,
        border: "1px solid #474747",
      },
      danger: {
        background: ERROR,
        backgroundActive: "#d12a1c",
        backgroundDisabled: "#99534e",
        text: WHITE,
      },
      text: {
        background: "unset",
        backgroundActive: "unset",
        backgroundDisabled: SECONDARY_DARK,
        text: WHITE,
        border: "none",
      },
    },
    iconButton: {
      primary: {
        color: "#D9D9D9",
        colorActive: "#EAEAEA",
        colorDisabled: DARK_GRAY,
      },
    },
    background: {
      primary: {
        color: "#0D0D0D",
      },
      secondary: {
        color: "#1B1B1B",
      },
    },
    input: {
      background: "#0D0D0D",
      border: "#474747",
      borderHover: "#525252",
    },
    timeSlotButton: {
      available: {
        background: "#1E1E1E",
        backgroundActive: "#F6F6F6",
        backgroundHover: "#3E3E3E",
        border: "transparent",
        borderActive: "#EAEAEA",
        text: "#F6F6F6",
      },
      unavailable: {
        background: "unset",
        backgroundActive: "unset",
        backgroundHover: "unset",
        border: "transparent",
        borderActive: "transparent",
        text: "#999999",
      },
      selected: {
        background: "#3E3E3E",
        backgroundActive: "#F6F6F6",
        backgroundHover: "#3E3E3E",
        border: "#D9D9D9",
        borderActive: "#EAEAEA",
        text: "#F6F6F6",
      },
    },
    fileUpload: {
      backgroundColor: "#1F1F1F",
    },
  },

  breakpoints: {
    sm: 540,
    md: 720,
    lg: 1200,
  },

  typography: {
    h1: {
      size: "1.25rem",
      weight: "700",
      lineHeight: "1.5rem",
    },
    h2: {
      size: "1.125rem",
      weight: "700",
      lineHeight: "1.625rem",
    },
    h3: {
      size: "0.9375rem",
      weight: "700",
      lineHeight: "1.125rem",
    },
    body: {
      size: "0.8125rem",
      weight: "400",
      lineHeight: "1.25rem",
    },
    label: {
      size: "0.6875rem",
      weight: "400",
      lineHeight: "0.8125rem",
    },
  },

  mediaBelow: (breakpoint: number) => `@media (max-width: ${breakpoint}px)`,
};

export { appTheme, lightTheme, darkTheme };
