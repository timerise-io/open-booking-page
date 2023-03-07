export type TypographyType = "h1" | "h2" | "h3" | "body" | "label";

export type ThemeColors =
  | "error"
  | "dark"
  | "lightGrey"
  | "mainGrey"
  | "darkGrey"
  | "success"
  | "white"
  | "warning"
  | "primary";

export interface TypographyTheme {
  size: string;
  weight: string;
  lineHeight: string;
}

export interface ButtonColorSchema {
  background: string;
  backgroundActive: string;
  backgroundDisabled: string;
  text: string;
  textDisabled?: string;
  border?: string;
}

export interface IconButtonColorSchema {
  color: string;
  colorActive: string;
  colorDisabled: string;
}

export interface TimeSlotButtonColorSchema {
  background: string;
  backgroundActive: string;
  border: string;
  borderActive: string;
  text: string;
}

export interface BackgroundColorSchema {
  color: string;
}

export type TimeSlotButtonType = "available" | "unavailable" | "selected";

export type ButtonType = "primary" | "secondary" | "danger" | "text";

export type IconButtonType = "primary";

export type BackgroundType = "primary" | "secondary";

export type ThemeType = "light" | "dark";
