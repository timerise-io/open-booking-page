import {
  BackgroundColorSchema,
  BackgroundType,
  ButtonColorSchema,
  ButtonType,
  IconButtonColorSchema,
  IconButtonType,
  ThemeColors,
  ThemeType,
  TimeSlotButtonColorSchema,
  TimeSlotButtonType,
  TypographyTheme,
  TypographyType,
} from "models/theme";
import "styled-components";

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
      fileUpload: {
        backgroundColor: string;
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
