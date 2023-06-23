import { Box, BoxProps } from "components/layout/Box";
import { AlignItems, JustifyContent } from "models/commonProperties";
import styled from "styled-components";

type RowProps = BoxProps & {
  jc?: JustifyContent;
  ai?: AlignItems;
  gap?: string;
};

export const Row = styled(Box)<RowProps>`
  display: flex;
  justify-content: ${({ jc }) => jc ?? "space-between"};
  align-items: ${({ ai }) => ai ?? "center"};
  gap: ${({ gap }) => gap ?? 0};
`;
