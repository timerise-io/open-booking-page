import styled from "styled-components";
import { Column } from "components/layout/Column";
import { PropsWithChildren, Suspense } from "react";

export const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  padding-top: 40px;
  min-height: 100vh;
  display: grid;
  grid-template-columns:
    1fr
    min(900px, calc(100% - 40px))
    1fr;

  & > * {
    grid-column: 2;
  }

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    & > * {
      grid-column: 1/-1;
    }
  }
`;

export const AppLayoutWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Suspense fallback={null}>
        <Column>{children}</Column>
      </Suspense>
    </Wrapper>
  );
};
