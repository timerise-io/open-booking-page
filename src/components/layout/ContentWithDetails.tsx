import { Column } from "components/layout/Column";
import styled from "styled-components";

export const ContentWithDetails = styled.div`
  display: flex;
  gap: ${({ theme }) => `calc(${theme.spacing} * 2.5)`};
  width: 100%;

  ${Column} > & {
    flex: 1;
  }

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.md)} {
    flex-direction: column;
  }
`;

export const DetailsSection = styled.section`
  width: 320px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${({ theme }) => `calc(${theme.spacing} * 2.5)`};

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.md)} {
    width: 100%;
    flex-direction: row;
  }

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    flex-direction: column;
    align-items: stretch;
    & > * {
      padding: 0 20px;
    }
  }
`;

export const ContentSection = styled.section`
  flex: 1;
`;

export const SliderWrapper = styled.div`
  position: relative;
  aspect-ratio: 90/67;
  min-width: 320px;
  width: -webkit-fill-available;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  background-color: transparent;

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    border-radius: 0;
  }

  & > .image-carousel {
    height: 100%;
  }

  .rec-carousel-wrapper {
    flex: 1;
  }

  .rec-carousel {
    min-height: 100%;
  }

  .rec-slider-container {
    margin: 0;
  }
`;

export const DetailsTextWrapper = styled.div`
  min-width: 320px;
  flex: 1;
`;
