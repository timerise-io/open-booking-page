import { DefaultTheme } from "styled-components";

const ERROR = "#C5221F";
const DARK = "#333333";
const LIGHT_GREY = "#F6F6F6";
const GREY = "#E7E7E7";
const DARK_GREY = "#6B6B6B";
const SUCCESS = "#1E7E34";
const WHITE = "#FFFFFF";
const WARNING = "#FE852F";
const PRIMARY_LIGHT_GREY = "#F2F2F2";
const PAGE_BACKGROUND = "#F5F5F7";

const sharedTheme = {
  borderRadius: "6px",
  spacing: "0.5rem",
  boxShadow: "none",

  breakpoints: {
    sm: 540,
    md: 720,
    lg: 1200,
  },

  typography: {
    h1: {
      size: "1.125rem",
      weight: "700",
      lineHeight: "1.375rem",
    },
    h2: {
      size: "1rem",
      weight: "700",
      lineHeight: "1.25rem",
    },
    h3: {
      size: "0.875rem",
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
      lineHeight: "0.875rem",
    },
  },

  mediaBelow: (breakpoint: number) => `@media (max-width: ${breakpoint}px)`,
} as const;

const appTheme: DefaultTheme = {
  ...sharedTheme,
  themeType: "light",

  colors: {
    error: ERROR,
    dark: DARK,
    lightGrey: LIGHT_GREY,
    mainGrey: GREY,
    darkGrey: DARK_GREY,
    success: SUCCESS,
    white: WHITE,
    warning: WARNING,
    primary: DARK,
    primaryLight: PRIMARY_LIGHT_GREY,
  },

  colorSchemas: {
    separator: "#e5e5e5",
    contextButton: {
      disabledText: DARK_GREY,
    },
    button: {
      primary: {
        background: DARK,
        backgroundActive: "#1a1a1a",
        backgroundDisabled: "#808080",
        text: WHITE,
      },
      secondary: {
        background: "unset",
        backgroundActive: "unset",
        backgroundDisabled: GREY,
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
        backgroundDisabled: GREY,
        text: DARK,
        border: "none",
      },
    },
    iconButton: {
      primary: {
        color: DARK,
        colorActive: "#141414",
        colorDisabled: DARK_GREY,
      },
    },
    background: {
      primary: {
        color: WHITE,
      },
      secondary: {
        color: PAGE_BACKGROUND,
      },
    },
    input: {
      background: WHITE,
      border: "#D9D9D9",
      borderHover: DARK_GREY,
    },
    timeSlotButton: {
      available: {
        background: PRIMARY_LIGHT_GREY,
        backgroundActive: WHITE,
        backgroundHover: "#E5E5E5",
        border: "transparent",
        borderActive: DARK_GREY,
        text: DARK,
      },
      unavailable: {
        background: "unset",
        backgroundActive: "unset",
        backgroundHover: "unset",
        border: "transparent",
        borderActive: "transparent",
        text: DARK_GREY,
      },
      selected: {
        background: "#E5E5E5",
        backgroundActive: PRIMARY_LIGHT_GREY,
        backgroundHover: "#E5E5E5",
        border: DARK,
        borderActive: DARK,
        text: DARK,
      },
    },
    fileUpload: {
      backgroundColor: PRIMARY_LIGHT_GREY,
    },
  },
};

const lightTheme = appTheme;

const darkTheme: DefaultTheme = {
  ...sharedTheme,
  themeType: "dark",

  colors: {
    error: "#EA4335",
    dark: "#D9D9D9",
    lightGrey: LIGHT_GREY,
    mainGrey: GREY,
    darkGrey: "#999999",
    success: "#34A853",
    white: DARK,
    warning: WARNING,
    primary: "#D9D9D9",
    primaryLight: "#3E3E3E",
  },

  colorSchemas: {
    separator: DARK,
    contextButton: {
      disabledText: "#535353",
    },
    button: {
      primary: {
        background: "#EAEAEA",
        backgroundActive: "#FAFAFA",
        backgroundDisabled: DARK,
        text: DARK,
        textDisabled: "#808080",
      },
      secondary: {
        background: "unset",
        backgroundActive: "unset",
        backgroundDisabled: GREY,
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
        backgroundDisabled: GREY,
        text: WHITE,
        border: "none",
      },
    },
    iconButton: {
      primary: {
        color: "#D9D9D9",
        colorActive: "#EAEAEA",
        colorDisabled: DARK_GREY,
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
};

export { appTheme, lightTheme, darkTheme };
