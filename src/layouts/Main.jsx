import { Outlet } from "react-router-dom";
import Header from "../pages/shared/Header/Header";
import Footer from "../pages/shared/Footer/Footer";
import { useEffect } from "react";
import AOS from 'aos';

const Main = () => {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div data-theme="">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;