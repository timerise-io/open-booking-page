import { ErrorLike } from "@apollo/client/core";
import { CombinedGraphQLErrors, CombinedProtocolErrors } from "@apollo/client/errors";

/**
 * Extended error type covering the legacy Apollo Client v3 error shape.
 * In v4 the raw link error (e.g. a fetch TypeError) is delivered directly,
 * but persisted/cached errors may still carry a nested networkError.
 */
interface ApolloQueryError extends ErrorLike {
  networkError?: Error | null;
}

export const isAbortError = (error: ApolloQueryError | undefined): boolean => {
  if (!error) return false;
  if (error.name === "AbortError") return true;

  return Boolean(
    error.networkError &&
    typeof error.networkError === "object" &&
    "name" in error.networkError &&
    error.networkError.name === "AbortError",
  );
};

export const isNetworkError = (error: ApolloQueryError | undefined): boolean => {
  if (!error) return false;

  // Ignore AbortError (intentional cancellation during navigation/unmount)
  if (isAbortError(error)) return false;

  // GraphQL execution / subscription protocol errors come from the server,
  // so the connection itself works — everything else is a transport failure
  if (CombinedGraphQLErrors.is(error) || CombinedProtocolErrors.is(error)) return false;

  return true;
};
