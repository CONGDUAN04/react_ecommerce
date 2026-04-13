// src/contexts/loading.context.jsx
import { createContext, useState, useCallback } from "react";

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

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
