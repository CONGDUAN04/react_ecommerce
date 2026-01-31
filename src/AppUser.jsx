import { Outlet } from "react-router-dom";
import Header from "./component/client/Layout/Header.jsx";
import { useContext } from "react";
import Footer from "./component/client/Layout/footer.jsx";

const AppUser = () => {
    return (
        <div className="bg-[#f6f7fb] min-h-screen flex flex-col">
            <Header cartCount={2} />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default AppUser;
