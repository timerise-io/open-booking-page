import { Box } from "components/layout/Box";
import { SkeletonBox } from "components/layout/SkeletonBox";
import { CompanyLogo } from "components/CompanyLogo";
import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useIsBrandedPageFlag } from "helpers/hooks/useIsBrandedPageFlag";
import { TIMERISE_LOGO_URL } from "helpers/constans";
import { useTranslation } from "react-i18next";
import { headerSelector } from "state/selectors/headerSelector";

const Wrapper = styled.div`
  display: flex;

  width: 100%;
  margin-bottom: calc(4.5 * ${({ theme }) => theme.spacing});

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    padding: 0 20px;
  }

  & > .full-row-wrap {
    width: 100%;
    gap: 20px;
    flex-wrap: wrap;
  }
`;

const HeaderLoader = () => {
  return (
    <Wrapper>
      <Row>
        <SkeletonBox w="40px" h="40px" />
        <Box ml={1.25}>
          <SkeletonBox w="200px" h="24px" />
        </Box>
      </Row>
    </Wrapper>
  );
};

const Header: React.FC = () => {
  const data = useRecoilValue(headerSelector);
  const isBrandedPage = useIsBrandedPageFlag();
  const { t } = useTranslation();
  if (isBrandedPage && data === undefined) return <HeaderLoader />;

  const logoUrl = isBrandedPage
    ? data?.logoUrl
    : undefined ?? TIMERISE_LOGO_URL;
  const headerTitle = isBrandedPage
    ? data?.title
    : undefined ?? t("solution-name");

  return (
    <Wrapper>
      <Row className="full-row-wrap">
        <Row>
          <CompanyLogo src={logoUrl} alt="logo" />
          <Box ml={1.25}>
            <Typography
              typographyType="h1"
              as="h1"
              displayType="contents"
              data-cy="company-name"
            >
              {headerTitle}
            </Typography>
          </Box>
        </Row>
      </Row>
    </Wrapper>
  );
};

export default Header;
