import React from "react";
import { CardButton } from "components/CardButton";
import { LinkButton } from "components/LinkButton";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import { SPACE_PROVIDERS_NAMES } from "helpers/constans";
import { Space as SpaceModel } from "models/booking";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => {
    return css`
      background: ${theme.colorSchemas.background.secondary.color};
    `;
  }};
`;

const ProviderButton = styled(LinkButton)`
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProviderLogo = styled.img`
  width: 24px;
  height: 24px;
`;

const LinkPreview = styled(Typography)`
  max-width: 195px;
  min-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  ${({ theme }) => {
    const color = theme.colorSchemas.iconButton.primary.colorDisabled;
    return css`
      color: ${color};
    `;
  }}
`;

interface SpaceProps {
  space: SpaceModel;
}

const Space = ({ space }: SpaceProps) => {
  return (
    <Wrapper>
      {space.instructions && (
        <Box mb={2}>
          <Typography typographyType="body" as="span" align="center">
            {space.instructions}
          </Typography>
        </Box>
      )}
      <Row mb={0.75}>
        <ProviderButton href={space.url} target="_blank">
          <ProviderLogo src={`https://cdn.timerise.io/admin/${space.provider}.png`} alt={`${space.provider} logo`} />
          {space.title || SPACE_PROVIDERS_NAMES[space.provider]}
        </ProviderButton>
        <CardButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(space.url);
          }}
        >
          Copy
        </CardButton>
      </Row>
      <LinkPreview typographyType="label" as="span">
        {space.url}
      </LinkPreview>
    </Wrapper>
  );
};

export default Space;
