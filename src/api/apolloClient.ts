import { VERSION } from "enums";
import { createClient } from "graphql-ws";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = split(
  (operation) => operation.getContext()?.version === VERSION.V2,
  new HttpLink({ uri: `${process.env.REACT_APP_TIMERISE_API}/${VERSION.V2}` }),
  new HttpLink({ uri: `${process.env.REACT_APP_TIMERISE_API}/${VERSION.V1}` }),
);

const wsLink = split(
  (operation) => operation.getContext()?.version === VERSION.V2,
  new GraphQLWsLink(createClient({ url: `${process.env.REACT_APP_TIMERISE_WS}/${VERSION.V2}`, connectionParams: {} })),
  new GraphQLWsLink(createClient({ url: `${process.env.REACT_APP_TIMERISE_WS}/${VERSION.V1}`, connectionParams: {} })),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
