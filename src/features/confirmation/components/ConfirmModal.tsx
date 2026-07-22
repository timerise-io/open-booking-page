import React, { PropsWithChildren } from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { ButtonType } from "models/theme";
import styled, { keyframes } from "styled-components";
import { IconX } from "@tabler/icons-react";

const overlayFadeIn = keyframes`
  from { opacity: 0; }
`;

const cardPopIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.97);
  }
`;

const Wrapper = styled.div`
  background-color: #00000073;
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 20px;
  box-sizing: border-box;
  animation: ${overlayFadeIn} 150ms ease-out;

  & > * {
    width: 100%;
    max-width: 460px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    & > * {
      animation: none;
    }
  }
`;

const StyledCard = styled(Card)`
  padding: 10px 10px 20px 20px;
  animation: ${cardPopIn} 180ms ease-out;
`;

const StyledButton = styled(Button)`
  width: unset;
  min-width: 110px;
  box-sizing: border-box;
`;

interface ConfirmModalProps {
  title: string;
  open?: boolean;
  abortText: string;
  confirmText: string;
  confirmButtonType: ButtonType;
  onClose?: () => void;
  onAbort?: () => void;
  onConfirm?: () => void;
}

const ConfirmModal: React.FC<PropsWithChildren<ConfirmModalProps>> = ({
  title,
  open,
  abortText,
  confirmText,
  children,
  confirmButtonType,
  onClose,
  onAbort,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <Wrapper>
      <StyledCard>
        <Column $ai="stretch">
          <Row $mb={1.5}>
            <Typography $typographyType="h3">{title}</Typography>
            <IconButton onClick={() => onClose?.()}>
              <IconX />
            </IconButton>
          </Row>
          <Box $mr={1.25}>{children}</Box>
          <Row $jc="flex-end" $mt={2.5} $gap="10px">
            <StyledButton onClick={() => onAbort?.()} $buttonType="secondary">
              {abortText}
            </StyledButton>
            <StyledButton onClick={() => onConfirm?.()} $buttonType={confirmButtonType}>
              {confirmText}
            </StyledButton>
          </Row>
        </Column>
      </StyledCard>
    </Wrapper>
  );
};

export default ConfirmModal;
