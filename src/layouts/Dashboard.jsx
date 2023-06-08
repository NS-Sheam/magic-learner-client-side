
import { Link, Outlet } from 'react-router-dom';
import logo from "../assets/logo.png"
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [userRole, isAdminLoading ] = useAdmin();
    const { isAdmin, role } = userRole;
    console.log(userRole, isAdminLoading);
//  const isAdmin = true;
//  const role = "instructor";
    const listItem = role === "instructor" ?
        <>
            <li className="my-1">
                <Link to={`/addclass`}> Add a Class
                </Link>
            </li>
            <li className="my-1">
                <Link to={`/myclass`}> My Class
                </Link>
            </li>
        </>
        : <>
            <li className="my-1">
                <Link to={`/addclass`}> My Selected Classes
                </Link>
            </li>
            <li className="my-1">
                <Link to={`/myclass`}> My Enrolled Classes
                </Link>
            </li>
            <li className="my-1">
                <Link to={`/myclass`}> Payment
                </Link>
            </li>
        </>
        if(isAdminLoading){
            return <div>Loading...</div>
        }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center bg-secondaryBg py-16">
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                {/* Sidebar content here */}
                <div className="overflow-y-auto">
                    <ul className="menu p-4 w-80 h-full bg-bandOrange font-bold text-xl min-h-screen">
                        <li className="text-3xl my-1 lg:py-3 lg:px-7">
                            <Link to=""> <img className=" h-6 lg:h-10" src={logo} alt="logo" />
                            </Link></li>
                        <li className="my-1">
                            <Link to={`/dashboard`}> Dashboard
                            </Link></li>
                        {
                            isAdmin && 
                            <li className="my-1">
                                <Link to="/dashboard/allusers">Users
                                </Link></li>
                        }
                        {listItem}

                        <div className="divide-y-2 border border-black"></div>
                        <li><Link to="/">Home
                        </Link></li>
                        <li>
                            <Link to="/classes">Classes
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
