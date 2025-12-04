import React from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import InfoBox from "components/InfoBox";
import { Typography } from "components/Typography";
import { useSmartNavigation } from "helpers/hooks";
import { useTranslation } from "react-i18next";
import type { ErrorInfo } from "state/stores";
import styled from "styled-components";
import { IconAlertCircle } from "@tabler/icons-react";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  gap: 16px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 300px;
  margin-top: 8px;
`;

interface ServiceNotFoundProps {
  error: ErrorInfo;
}

const ServiceNotFound: React.FC<ServiceNotFoundProps> = ({ error }) => {
  const { t } = useTranslation(["common"]);
  const { navigateToHome, isEmbeddedPage } = useSmartNavigation();

  const handleRetry = () => {
    if (error.refetch) {
      error.refetch();
    }
  };

  return (
    <Card>
      <ErrorContainer>
        <IconWrapper>
          <IconAlertCircle size={48} color="#f44336" />
        </IconWrapper>
        <Typography $typographyType="h3" as="h3">
          {t("common:errors.service-not-found-title")}
        </Typography>
        <InfoBox>{t("common:errors.service-not-found-message")}</InfoBox>
        <ButtonContainer>
          {error.canRetry && (
            <Button $buttonType="primary" onClick={handleRetry}>
              {t("common:errors.retry")}
            </Button>
          )}
          {!isEmbeddedPage && (
            <Button $buttonType="secondary" onClick={navigateToHome}>
              {t("common:errors.return-home")}
            </Button>
          )}
          {isEmbeddedPage && (
            <Typography $typographyType="body" as="p">
              {t("common:errors.contact-website-owner")}
            </Typography>
          )}
        </ButtonContainer>
      </ErrorContainer>
    </Card>
  );
};

export default ServiceNotFound;
