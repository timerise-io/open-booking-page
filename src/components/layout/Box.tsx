import styled from "styled-components";

export interface BoxProps {
  w?: string;
  h?: string;
  m?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  p?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
}

export const Box = styled.div<BoxProps>`
  width: ${({ w: width }) => width ?? "unset"};
  height: ${({ h: height }) => height ?? "unset"};
  margin: ${({ theme, mt, mr, mb, ml, m = 0 }) =>
    `calc(${theme.spacing} * ${mt ?? m}) calc(${theme.spacing} * ${
      mr ?? m
    }) calc(${theme.spacing} * ${mb ?? m}) calc(${theme.spacing} * ${
      ml ?? m
    })`};
  padding: ${({ theme, pt, pr, pb, pl, p = 0 }) =>
    `calc(${theme.spacing} * ${pt ?? p}) calc(${theme.spacing} * ${
      p ?? pr
    }) calc(${theme.spacing} * ${p ?? pb}) calc(${theme.spacing} * ${
      p ?? pl
    })`};
`;
