export const isNetworkError = (error: any | undefined): boolean => {
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

export const isAbortError = (error: any | undefined): boolean => {
  return Boolean(
    error?.networkError &&
    typeof error.networkError === "object" &&
    "name" in error.networkError &&
    error.networkError.name === "AbortError",
  );
};
