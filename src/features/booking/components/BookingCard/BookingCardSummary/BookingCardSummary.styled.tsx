import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import styled from "styled-components";

export const StyledColumn = styled(Column)`
  margin-top: 40px;

  .icon-draft {
    color: #fd842e;
  }

  .icon-accepted {
    color: #34a853;
  }

  .icon-deleted {
    color: #ea4335;
  }

  & > svg {
    width: 48px;
    height: 48px;
  }

  .status-info {
    margin-top: 10px;
    margin-bottom: 7px;
  }

  .status-description {
    margin-bottom: 10px;
  }
`;

export const StyledRow = styled(Row)`
  flex-wrap: wrap;
  & > svg {
    width: 16px;
    height: 16px;
  }
`;
