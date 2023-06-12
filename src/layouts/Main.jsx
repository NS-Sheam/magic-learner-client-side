import { Outlet } from "react-router-dom";
import Header from "../pages/shared/Header/Header";
import Footer from "../pages/shared/Footer/Footer";
import { useEffect } from "react";
import AOS from 'aos';
import useAuth from "../hooks/useAuth";

const Main = () => {
    const { theme } = useAuth();
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div data-theme={theme} className="max-w-[2520px] mx-auto">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;