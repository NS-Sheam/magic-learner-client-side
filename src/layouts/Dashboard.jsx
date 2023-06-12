
import { Link, Outlet } from 'react-router-dom';
import logo from "../assets/logo.png"
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { useEffect, useState } from 'react';
import Footer from '../pages/shared/Footer/Footer';
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
    const [userRole, isAdminLoading] = useAdmin();
    if ( isAdminLoading) {
        return <div className='flex justify-center items-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    const { isAdmin } = userRole;
    // const [role, setRole] = useState(userRole);
    // const [isAdminLoading, setIsAdminLoading] = useState(true)

    // useEffect(() => {
    //     if (!loading) {
    //         fetch(`https://summer-camp-server-side-alpha.vercel.app/users/admin/${user?.email}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 // setIsAdmin(data.isAdmin)
    //                 // setRole(data.role)
    //                 // setIsAdminLoading(false);
    //             })
    //     }
    // }, [user, loading])
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
                <Link to={`/myclass`}> Payment
                </Link>
            </li>
        </>

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center bg-secondaryBg py-16 px-4">
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="absolute top-0 right-0 text-black m-4 p-4 border border-black rounded-md drawer-button lg:hidden"><FaBars/></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    {/* Sidebar content here */}
                    <div className="overflow-y-auto">
                        <ul className="menu p-4 w-80 h-full bg-bandOrange font-bold text-xl min-h-screen">
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
