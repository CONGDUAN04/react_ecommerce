import { Outlet } from "react-router-dom";
import Header from "./component/client/Layout/Header.jsx";
import { useContext } from "react";
import { NotifyContext } from "./component/context/notify.context.jsx";

const AppUser = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default AppUser;
