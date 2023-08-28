import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (!loading && user?.email) {
        return children;
    }

    if (!loading) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>;

    }
};

export default PrivateRoutes;