import { Button } from "components/Button";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
`;

const StyledH1 = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 120px;
  line-height: 145px;
  text-align: center;
  display: contents;
`;

const StyledH2 = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  margin: 0;

  text-align: center;
`;

const StyledInfo = styled.p`
  max-width: 500px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;

  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 19px;
  max-width: 108px;
`;

const ErrorPage = () => {
  return (
    <Wrapper data-cy="error-page">
      <div>
        <StyledH1>404</StyledH1>
      </div>
      <div>
        <StyledH2>Oh no... there’s nothing here! 😱</StyledH2>
      </div>
      <StyledInfo>
        Don’t worry, it’s just an error. Sometimes it happens, but don't get
        discouraged. Try again with a different address or...
      </StyledInfo>
      <StyledButton
        buttonType="primary"
        onClick={() => {
          window.open("https://timerise.io/", "_blank")?.focus();
        }}
      >
        Visit our website
      </StyledButton>
    </Wrapper>
  );
};

export default ErrorPage;
