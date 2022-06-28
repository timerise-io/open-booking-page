import styled from "styled-components";

const StyledLabel = styled.label`
  margin-bottom: calc(0.5 * ${({ theme }) => theme.spacing});
  font-size: ${({ theme }) => theme.typography.label.size};
  font-weight: ${({ theme }) => theme.typography.label.weight};
  line-height: ${({ theme }) => theme.typography.label.lineHeight};
  color: ${({ theme }) => theme.colors.dark};
`;

export default StyledLabel;
