import styled from "styled-components";
import { AlignItems, JustifyContent } from "models/commonProperties";
import { Box, BoxProps } from "components/layout/Box";

type ColumnProps = BoxProps & {
  jc?: JustifyContent;
  ai?: AlignItems;
};

export const Column = styled(Box)<ColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ jc }) => jc ?? "space-between"};
  align-items: ${({ ai }) => ai ?? "center"};

  & > .stretch-element {
    flex: 1;
  }
`;
