import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // if (loading) {
    //     return <div className="h-screen flex justify-center items-center">
    //         <button className="loading loading-bars loading-lg">loading</button>
    //     </div>

    // }

    if (!loading && user?.email) {
        return children;
    }

    if (!loading) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
        
    }
};

export default PrivateRoutes;