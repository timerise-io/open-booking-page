import { InMemoryCache } from "@apollo/client/core";

const CACHE_VERSION = "v2";
const CACHE_KEY = `apollo-cache-${CACHE_VERSION}`;
const PERSISTABLE_TYPES = ["Service", "Project"];

export const persistCache = (cache: InMemoryCache) => {
  try {
    const data = cache.extract();

    // Filter to only persist stable data (Service and Project)
    const filtered = Object.keys(data)
      .filter((key) => PERSISTABLE_TYPES.some((type) => key.startsWith(type)))
      .reduce(
        (obj, key) => {
          obj[key] = data[key];
          return obj;
        },
        {} as Record<string, unknown>,
      );

    localStorage.setItem(CACHE_KEY, JSON.stringify(filtered));
    localStorage.setItem(`${CACHE_KEY}-timestamp`, Date.now().toString());
  } catch (error) {
    console.warn("Failed to persist cache:", error);
  }
};

export const restoreCache = async (cache: InMemoryCache) => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      cache.restore(parsed);
      return true;
    }
  } catch (error) {
    console.warn("Failed to restore cache:", error);
    localStorage.removeItem(CACHE_KEY);
  }
  return false;
};

export const shouldEvictCache = () => {
  const lastUpdated = localStorage.getItem(`${CACHE_KEY}-timestamp`);
  if (!lastUpdated) return false;

  const age = Date.now() - parseInt(lastUpdated);
  const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

  return age > MAX_AGE;
};
