import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { IconButton } from "components/IconButton";
import React, { useState } from "react";
import styled, { css } from "styled-components";

const MainWrapper = styled.div`
  min-height: inherit;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

interface StyledImgProps {
  index: number;
  currentIndex: number;
}

const StyledImg = styled.img<StyledImgProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;

  ${({ index, currentIndex }) => {
    return css`
      right: calc(-100% * ${index - currentIndex});
    `;
  }}
`;

interface ArrowButtonProps {
  arrowType: "PREV" | "NEXT";
}

const ArrowButton = styled(IconButton)<ArrowButtonProps>`
  padding: 4px;
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.white};
  ${({ arrowType }) =>
    arrowType === "PREV"
      ? css`
          left: 12px;
        `
      : css`
          right: 12px;
        `}

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 15px;
  flex-wrap: wrap;
  margin-top: 15px;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);

  .bullet {
    margin: 0 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
  }

  .activeBullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface ImageCarouselProps {
  images: Array<string>;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <MainWrapper>
      {images.length > 1 && (
        <>
          <ArrowButton
            onClick={() => {
              setCurrentIndex(currentIndex - 1);
            }}
            disabled={currentIndex < 1}
            arrowType="PREV"
          >
            <IconChevronLeft />
          </ArrowButton>
          <ArrowButton
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
            }}
            disabled={currentIndex >= images.length - 1}
            arrowType="NEXT"
          >
            <IconChevronRight />
          </ArrowButton>
          <PaginationWrapper>
            {images.map((_, index: number) => {
              const isActivePage = currentIndex === index;
              return (
                <div className="bullet" key={`bullet-${index}`}>
                  {isActivePage && <div className="activeBullet" />}
                </div>
              );
            })}
          </PaginationWrapper>
        </>
      )}
      {images.map((url, index) => {
        return (
          <StyledImg
            key={`image-carousel-${index}`}
            src={url}
            index={index}
            currentIndex={currentIndex}
          />
        );
      })}
    </MainWrapper>
  );
};

export default ImageCarousel;
