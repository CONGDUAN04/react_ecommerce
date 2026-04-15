import { createContext, useState, useEffect, useMemo } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isAppLoading: true,
  setIsAppLoading: () => {},
});

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem("user");

    if (u && u !== "null") {
      setUser(JSON.parse(u));
    }

    setIsAppLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAppLoading,
      setIsAppLoading,
    }),
    [user, isAppLoading],
  );

  if (isAppLoading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
