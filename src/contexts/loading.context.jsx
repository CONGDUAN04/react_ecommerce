// src/component/context/loading.context.jsx
import { createContext, useState } from "react";

export const LoadingContext = createContext({
    loading: false,
    setLoading: () => { },
});
const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
export default LoadingProvider;
