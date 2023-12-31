
import logo from "../../../assets/logo.png"
import { useContext } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { AuthContext } from '../../../Providers/AuthProvider';
import ActiveLink from './ActiveLink';
import { Link } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme, setTheme } = useAuth();
    // console.log(user);
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error);
            })
    }
    const menuItems = <>
        <li>
            <ActiveLink to={`/`}>Home</ActiveLink>
        </li>
        <li>
            <ActiveLink to={`/about`}>About</ActiveLink>
        </li>
        <li>
            <ActiveLink to={`/instructors`}>Instructors</ActiveLink>
        </li>
        <li>
            <ActiveLink to={`/allclass`}>Classes</ActiveLink>
        </li>
        <li>
            <ActiveLink to={`/dashboard/allclass`}>Dashboard</ActiveLink>
        </li>
        <li>
            <ActiveLink to={`/blogs`}>Blog</ActiveLink>
        </li>
        <li>
            <ActiveLink to={`/contact`}>Contact</ActiveLink>
        </li>
        <li className="text-5xl lg:text-xl" onClick={() => theme == "light" ? setTheme("dark") : setTheme("light")}>
            {
                theme == "light" ?
                    <BsFillMoonStarsFill /> :
                    <BsFillSunFill />
            }
        </li>
        <div className="lg:hidden">
            {
                !user ?

                    <>
                        <li>
                            <FaUserAlt className="text-5xl lg:text-xl" />
                        </li>
                        <li>
                            <ActiveLink to={`/login`}>
                                Login
                            </ActiveLink>
                        </li>
                    </> :
                    <>
                        <li>
                            <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="" />
                        </li>
                        <li onClick={handleLogOut}>
                            <Link>
                                Logout
                            </Link>
                        </li>
                    </>
            }
        </div>
    </>
    return (
        <div className={`${theme === "light" ? "text-black" : "text-white"} navbar bg-orange-primary font-bold lg:py-6`}>
            <div className="navbar-start">
                <Link to="/" className="flex justify-center items-center lg:gap-4">
                    <img className=" h-6 lg:h-10" src={logo} alt="logo" />
                    <h3 className="lg:text-xl font-bold">Magic Learner</h3>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-4 px-1 items-center">
                    {
                        menuItems
                    }

                </ul>
            </div>
            <div className="navbar-end hidden lg:block">
                <ul className="flex justify-center items-center gap-4 px-1">

                    {
                        !user ?

                            <>
                                <li>
                                    <FaUserAlt />
                                </li>
                                <li>
                                    <ActiveLink to={`/login`}>
                                        Login
                                    </ActiveLink>
                                </li>
                            </> :
                            <>
                                <li>
                                    <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
                                </li>
                                <li onClick={handleLogOut}>
                                    <Link>
                                        Logout
                                    </Link>
                                </li>
                            </>
                    }
                </ul>
            </div>
            <div className="dropdown navbar-end lg:hidden me-4">
                <label tabIndex={0} className="btn btn-ghost lg:hidden w-full flex items-center justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className={`${theme === "light" ? "bg-white" : "bg-slate-900"} menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 z-10 right-6`}>
                    {
                        menuItems
                    }

                </ul>
            </div>
        </div >
    );
};

export default Header;