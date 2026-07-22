import styled from "styled-components";
import { cardButtonStyles } from "./LinkButton";

export const CardButton = styled.button`
  ${cardButtonStyles}
  box-sizing: border-box;

  &:focus {
    border: 1px solid #999999;
  }
`;
