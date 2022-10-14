import "styled-components";
import {
  ThemeType,
  ThemeColors,
  ButtonType,
  ButtonColorSchema,
  IconButtonType,
  IconButtonColorSchema,
  BackgroundType,
  BackgroundColorSchema,
  TypographyType,
  TypographyTheme,
  TimeSlotButtonColorSchema,
  TimeSlotButtonType,
} from "models/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    themeType: ThemeType;

    spacing: string;

    borderRadius: string;

    boxShadow: string;

    colors: Record<ThemeColors, string>;

    colorSchemas: {
      separator: string;
      contextButton: {
        disabledText: string;
      };
      button: Record<ButtonType, ButtonColorSchema>;
      iconButton: Record<IconButtonType, IconButtonColorSchema>;
      background: Record<BackgroundType, BackgroundColorSchema>;
      timeSlotButton: Record<TimeSlotButtonType, TimeSlotButtonColorSchema>;
      input: {
        background: string;
        border: string;
        borderHover: string;
      };
    };

    breakpoints: {
      sm: number;
      md: number;
      lg: number;
    };

    typography: Record<TypographyType, TypographyTheme>;

    mediaBelow: (number) => string;
  }
}
