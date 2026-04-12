import { Outlet } from "react-router-dom";
import Header from "./layouts/client/Header.jsx";
import Footer from "./layouts/client/footer.jsx";

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
