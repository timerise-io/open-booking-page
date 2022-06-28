import { ApolloClient, InMemoryCache } from "@apollo/client/core";

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_TIMERISE_API,
  cache: new InMemoryCache(),
});
