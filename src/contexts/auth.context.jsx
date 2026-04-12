
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    user: null,
    setUser: () => { },
    isAppLoading: true,
    setIsAppLoading: () => { },
});

export const AuthWrapper = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u) setUser(JSON.parse(u));
        setIsAppLoading(false);
    }, []);

    if (isAppLoading) return <div>Loading...</div>; // Chờ load xong

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading }}>
            {children}
        </AuthContext.Provider>
    );
};