import { VERSION } from "enums";
import { GraphQLFormattedError } from "graphql";
import { createClient } from "graphql-ws";
import { Reference } from "@apollo/client/cache";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client/core";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { ErrorLink } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { persistCache, restoreCache, shouldEvictCache } from "./cacheConfig";

// Enhanced InMemoryCache with type policies for normalized caching
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        service: {
          keyArgs: ["serviceId"],
          merge(existing, incoming, { mergeObjects }) {
            return mergeObjects(existing, incoming);
          },
        },
        project: {
          keyArgs: ["projectId"],
          merge(existing, incoming, { mergeObjects }) {
            return mergeObjects(existing, incoming);
          },
        },
        booking: {
          keyArgs: ["bookingId"],
          merge(existing, incoming) {
            return incoming; // Always prefer latest booking state
          },
        },
      },
    },
    Service: {
      keyFields: ["serviceId"],
      fields: {
        slots: {
          keyArgs: false,
          merge(existing = [], incoming = [], { readField }) {
            // Merge slots by slotId, avoiding duplicates
            const merged = existing.slice(0);
            const existingIdSet = new Set(merged.map((slot: Reference) => readField("slotId", slot)));
            incoming.forEach((slot: Reference) => {
              const slotId = readField("slotId", slot);
              if (!existingIdSet.has(slotId)) {
                merged.push(slot);
              }
            });
            return merged;
          },
        },
        viewConfig: {
          merge(existing, incoming, { mergeObjects }) {
            return mergeObjects(existing, incoming);
          },
        },
      },
    },
    Slot: { keyFields: ["slotId"] },
    Booking: { keyFields: ["bookingId"] },
    Project: { keyFields: ["projectId"] },
    Location: { keyFields: ["locationId"] },
  },
});

// Restore cache from localStorage on initialization
if (shouldEvictCache()) {
  cache.reset();
  localStorage.removeItem(`apollo-cache-v1`);
  localStorage.removeItem(`apollo-cache-v1-timestamp`);
} else {
  restoreCache(cache);
}

// Persist cache to localStorage before page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    persistCache(cache);
  });
}

// Error link for monitoring and consistent error handling
const errorLink = new ErrorLink(({ error, operation }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }: GraphQLFormattedError) => {
      console.error(`[GraphQL error]: Message: ${message}, Operation: ${operation.operationName}`);
    });
  } else if (error) {
    console.error(`[Network error]: ${error.message}, Operation: ${operation.operationName}`);
  }
});

const httpLink = new HttpLink({ uri: `https://${import.meta.env.VITE_TIMERISE_API_DOMAIN}/${VERSION.V1}` });

const wsLink = new GraphQLWsLink(
  createClient({ url: `wss://${import.meta.env.VITE_TIMERISE_API_DOMAIN}/${VERSION.V1}`, connectionParams: {} }),
);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, splitLink]),
  cache,
  queryDeduplication: true, // Prevent duplicate simultaneous requests
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: false,
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
