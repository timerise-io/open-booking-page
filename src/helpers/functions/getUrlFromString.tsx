import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  all: unset;
  text-decoration: underline;
  word-break: break-word;
`;

export const getUrlFromString = (text: any) => {
  const regex = /(https?:\/\/[^\s]+)/g;

  const openUrl = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
    event.stopPropagation();
    event.preventDefault();
    window.open(url, "_blank");
  };

  return text.split(regex).map((word: any, index: any) => {
    let hasLastBracket = false;

    if (word.match(regex)) {
      if (word.slice(-1) === ")") {
        word = word.substring(0, word.length - 1);
        hasLastBracket = true;
      }
      return (
        <React.Fragment key={index}>
          <StyledLink
            key={index}
            onClick={(e) => openUrl(e, word)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {word}
          </StyledLink>
          {hasLastBracket && ")"}
        </React.Fragment>
      );
    }
    return word;
  });
};
