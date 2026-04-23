import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useTheme, useUiStore } from "state/stores";
import styled, { css } from "styled-components";

const Wrapper = styled(Row)`
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;

  & > .left-column {
    width: auto;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    padding: 0 20px;
  }
`;

const VerticalLine = styled.div`
  margin-top: 8px;
  height: ${({ theme }) => theme.typography.label.lineHeight};
  border-left: 1px solid ${({ theme }) => theme.colors.darkGrey};
`;

const TimeRiseLogo = styled.img`
  margin-left: 10px;
  height: 12px;
`;

export const FooterLinkWrapper = styled.div`
  & > * {
    font-style: normal;
    display: block;
    text-decoration: none;
    white-space: nowrap;
    margin-top: 8px;

    ${({ theme }) => {
      const typographyTheme = theme.typography.label;
      return css`
        font-size: ${typographyTheme.size};
        font-weight: ${typographyTheme.weight};
        line-height: ${typographyTheme.lineHeight};
        color: ${theme.colors.darkGrey};

        &:hover {
          color: ${theme.colors.dark};
        }
      `;
    }}
  }
`;

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  white-space: nowrap;
  margin-top: 8px;

  ${({ theme }) => {
    const typographyTheme = theme.typography.label;
    return css`
      font-size: ${typographyTheme.size};
      font-weight: ${typographyTheme.weight};
      line-height: ${typographyTheme.lineHeight};
      color: ${theme.colors.darkGrey};

      &:hover {
        color: ${theme.colors.dark};
      }
    `;
  }}
`;

const StyledLink = styled.a``;

const ErrorFooterWrapper = styled.div`
  margin-bottom: 12px;
`;

const ErrorFooter = () => {
  const { t } = useTranslation();
  return (
    <ErrorFooterWrapper>
      <Typography $typographyType="label" $color="darkGrey" as="div" style={{ whiteSpace: "nowrap", marginTop: "8px" }}>
        {t("footer.copyright")}
      </Typography>
    </ErrorFooterWrapper>
  );
};

const Footer = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const themeType = useTheme();
  const setUserPreference = useUiStore((state) => state.setUserPreference);
  const { isEmbeddedPage } = useIsEmbeddedPage();

  if (isEmbeddedPage) return null;
  if (location.pathname === "/") return <ErrorFooter />;

  const nextTheme = themeType === "dark" ? "light" : "dark";

  return (
    <Wrapper $mb={1.5} $mt={5} $jc="space-between">
      <Row className="left-column">
        <Typography
          $typographyType="label"
          $color="darkGrey"
          as="div"
          style={{ whiteSpace: "nowrap", marginTop: "8px" }}
        >
          {t("footer.copyright")}
        </Typography>
        <VerticalLine />
        <StyledButton onClick={() => setUserPreference({ theme: nextTheme })}>
          {t(`theme.${nextTheme}`)}
        </StyledButton>
      </Row>
      <Row $ai="center" style={{ marginTop: "8px" }}>
        <Typography $typographyType="label" as="div" $color="darkGrey">
          {t("footer.powered-by")}
        </Typography>
        <StyledLink href="https://timerise.io/" target="_blank">
          <TimeRiseLogo src="/timerise-logo.png" alt="timerise logo" data-cy="time-rise-footer-logo" />
        </StyledLink>
      </Row>
    </Wrapper>
  );
};

export default Footer;
