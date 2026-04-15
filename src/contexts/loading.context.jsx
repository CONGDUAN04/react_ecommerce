import { createContext, useState, useCallback, useMemo } from "react";

export const LoadingContext = createContext({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

const LoadingProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const startLoading = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setCount((prev) => Math.max(prev - 1, 0));
  }, []);

  const loading = count > 0;

  const value = useMemo(
    () => ({
      loading,
      startLoading,
      stopLoading,
    }),
    [loading, startLoading, stopLoading],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export default LoadingProvider;
