import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Card } from "components/Card";
import { IconButton } from "components/IconButton";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import { IconX } from "@tabler/icons";
import { Button } from "components/Button";
import { Box } from "components/layout/Box";
import { ButtonType } from "models/theme";

const Wrapper = styled.div`
  background-color: #00000073;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: grid;
  place-items: center;
  & > * {
    width: 100%;
    max-width: 460px;
  }
`;

const StyledCard = styled(Card)`
  padding: 10px 10px 20px 20px;
`;

const StyledButton = styled(Button)`
  width: unset;
  margin-right: 10px;
`;

interface ConfirmModalProps {
  title: string;
  open?: boolean;
  abortText: string;
  confirmText: string;
  confirmButtonType: ButtonType;
  onClose?: Function;
  onAbort?: Function;
  onConfirm?: Function;
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
        <Column ai="stretch">
          <Row mb={1.5}>
            <Typography typographyType="h3">{title}</Typography>
            <IconButton onClick={() => onClose && onClose()}>
              <IconX />
            </IconButton>
          </Row>
          <Box mr={1.25}>{children}</Box>
          <Row jc="flex-end" mt={2.5}>
            <StyledButton
              onClick={() => onAbort && onAbort()}
              buttonType="secondary"
            >
              {abortText}
            </StyledButton>
            <StyledButton
              onClick={() => onConfirm && onConfirm()}
              buttonType={confirmButtonType}
            >
              {confirmText}
            </StyledButton>
          </Row>
        </Column>
      </StyledCard>
    </Wrapper>
  );
};

export default ConfirmModal;
