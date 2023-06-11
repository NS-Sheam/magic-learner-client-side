import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Login/Register/Register";
import Dashboard from "../layouts/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddClass from "../pages/Dashboard/AllUsers/AddClass/AddClass";
import AllClasses from "../pages/AllClasses/AllClasses";
import Instructor from "../pages/Instructor/Instructor";
import EnrolledClasses from "../pages/Dashboard/EnrolledClasses/EnrolledClasses";
import PrivateRoutes from "./PrivateRoutes";
import SelectedClass from "../pages/Dashboard/SelectedClass/SelectedClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import AdminRoute from "./AdminRoute";

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
            },
            {
                path: "instructors",
                element: <Instructor />
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoutes>
            <Dashboard />
        </PrivateRoutes>,
        children: [
            {
                path: "allusers",
                element: <AdminRoute>
                    <AllUsers />
                </AdminRoute>
            },
            {
                path: "addclass",
                element: <AddClass />
            },
            {
                path: "enrolledclass",
                element: <EnrolledClasses />
            },
            {
                path: "allclass",
                element: <AllClasses />
            },
            {
                path: "selectedclass",
                element: <SelectedClass />
            },
            {
                path: "myclasses",
                element: <MyClasses />
            },
        ]
    }
]);