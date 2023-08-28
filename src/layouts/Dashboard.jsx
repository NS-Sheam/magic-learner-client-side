
import { Link, Outlet } from 'react-router-dom';
import logo from "../assets/logo.png"
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import Footer from '../pages/shared/Footer/Footer';
import { FaBars } from "react-icons/fa";
import useMyClasses from '../hooks/useMyClasses';
import { motion } from "framer-motion";

const Dashboard = () => {
    const [userRole, isAdminLoading] = useAdmin();
    const { loading, theme } = useAuth()
    const { classLoading } = useMyClasses()
    if (loading || classLoading || isAdminLoading) {
        return <div className='h-screen flex justify-center items-center'>
            <motion.img
                className="h-16 w-16 mx-auto"
                src={logo}
                alt=""
                animate={{
                    scale: [1, 1.2, 1.2, 1, 1],
                    rotate: [0, 0, 360, 360, 0],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                }}
            />
        </div>
    }

    const { isAdmin } = userRole;
    const listItem = userRole?.role === "instructor" ?
        <>
            <li className="my-1">
                <Link to={`/dashboard/addclass`}> Add a Class
                </Link>
            </li>
            <li className="my-1">
                {/* TODO: make my class for instructor */}
                <Link to={`/dashboard/myclasses`}> My Class
                </Link>
            </li>
        </>
        : <>
            <li className="my-1">
                <Link to={`/dashboard/selectedclass`}> My Selected Classes
                </Link>
            </li>
            <li className="my-1">
                <Link to={`/dashboard/enrolledclass`}> My Enrolled Classes
                </Link>
            </li>
            <li className="my-1">
                {/* TODO: make payment for instructor */}
                <Link to={`/dashboard/payment`}> Payment
                </Link>
            </li>
        </>
    console.log(theme);
    return (
        <>
            <div className={`${theme === "light" ? "text-black bg-white" : "text-white bg-black"} drawer lg:drawer-open`}>
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center bg-secondaryBg py-16 px-4">
                    <Outlet />
                    <label htmlFor="my-drawer-2" className={`${theme === "light" ? "text-black border-black" : "text-white border-white"} absolute top-0 right-0 m-4 p-4 border rounded-md drawer-button lg:hidden`}><FaBars /></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    {/* Sidebar content here */}
                    <div className="overflow-y-auto">
                        <ul className={`${theme === "light" ? "text-black border-black" : "text-white border-white"} menu p-4 w-80 h-full bg-bandOrange font-bold text-xl min-h-screen`}>
                            <li className="text-3xl my-1 lg:py-3 lg:px-7">
                                <Link to=""> <img className=" h-6 lg:h-10" src={logo} alt="logo" />
                                </Link></li>
                            {
                                isAdmin &&
                                <li className="my-1">
                                    <Link to="/dashboard/allusers">Manage Users
                                    </Link></li>
                            }
                            {listItem}

                            <div className="divide-y-2 border border-black"></div>
                            <li><Link to="/">Home
                            </Link></li>
                            <li>
                                <Link to="/dashboard/allclass">{isAdmin ? "Manage Classes" : "Classes"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
