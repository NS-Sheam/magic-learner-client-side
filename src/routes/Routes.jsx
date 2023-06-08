import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Login/Register/Register";
import Dashboard from "../layouts/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddClass from "../pages/Dashboard/AllUsers/AddClass/AddClass";
import AllClasses from "../pages/AllClasses/AllClasses";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <div>error</div>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "allclass",
                element: <AllClasses />
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "users",
                element: <div>dfd</div>
            },
            {
                path: "allusers",
                element: <AllUsers />
            },
            {
                path: "addclass",
                element: <AddClass />
            }
        ]
    }
]);