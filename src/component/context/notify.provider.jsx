// src/component/context/notify.provider.jsx
import { notification } from "antd";
import { NotifyContext } from "./notify.context.jsx";

const NotifyProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    return (
        <NotifyContext.Provider value={{ api, contextHolder }}>
            {contextHolder}
            {children}
        </NotifyContext.Provider>
    );
};


export default NotifyProvider;
