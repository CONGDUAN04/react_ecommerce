import { notification } from "antd";
import { NotifyContext } from "./notify.context.jsx";
import { useMemo } from "react";

const NotifyProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const value = useMemo(
    () => ({
      api,
      contextHolder,
    }),
    [api, contextHolder],
  );

  return (
    <NotifyContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotifyContext.Provider>
  );
};

export default NotifyProvider;
