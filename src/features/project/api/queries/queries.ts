import { gql } from "@apollo/client/core";

export const GET_PROJECT = gql`
  query GetProject($projectId: ID!) {
    project(projectId: $projectId) {
      title
      logoUrl
      theme
    }
  }
`;
