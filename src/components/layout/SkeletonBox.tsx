import styled, { css } from "styled-components";
import { Box, BoxProps } from "./Box";

type SkeletonBoxProps = BoxProps & {
  version?: "primary" | "secondary";
};

export const SkeletonBox = styled(Box)<SkeletonBoxProps>`
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  animation: fadein 1s;
  ${({ theme, version }) => {
    const backgroundColor = theme.themeType === "light" ? "#e7e7e7" : version === "secondary" ? "#202020" : "#0a0a0a";
    return css`
      background-color: ${backgroundColor};
    `;
  }}

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg, #0a0a0a 0, #1a1a1a 45%, #1a1a1a 55%, #0a0a0a);
    animation: shimmer 2s infinite;
    content: "";
    ${({ theme, version }) => {
      const gradient =
        theme.themeType === "light"
          ? `#e7e7e7 0, #f6f6f6 45%, #f6f6f6 55%, #e7e7e7`
          : version === "secondary"
          ? "#202020 0, #0d0d0d 45%, #0d0d0d 55%, #202020"
          : `#0a0a0a 0, #1a1a1a 45%, #1a1a1a 55%, #0a0a0a`;
      return css`
        background-image: linear-gradient(90deg, ${gradient});
      `;
    }}
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
