import { ErrorLike } from "@apollo/client/core";

/**
 * Extended error type that includes Apollo Client v4 runtime error properties.
 * While the base ErrorLike type doesn't include these, they exist at runtime.
 */
interface ApolloQueryError extends ErrorLike {
  networkError?: Error | null;
  graphQLErrors?: readonly unknown[];
}

export const isNetworkError = (error: ApolloQueryError | undefined): boolean => {
  if (!error) return false;

  // Check for network errors
  if (error.networkError) {
    // Ignore AbortError (intentional cancellation during navigation/unmount)
    if ("name" in error.networkError && error.networkError.name === "AbortError") {
      return false;
    }
    return true;
  }

  return false;
};

export const isAbortError = (error: ApolloQueryError | undefined): boolean => {
  return Boolean(
    error?.networkError &&
    typeof error.networkError === "object" &&
    "name" in error.networkError &&
    error.networkError.name === "AbortError",
  );
};
