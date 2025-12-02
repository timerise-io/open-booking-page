import styled from "styled-components";

export const CompanyLogo = styled.img.attrs(() => ({ "data-cy": "company-logo" }) as Record<string, string>)`
  height: 40px;
  width: 40px;
`;
