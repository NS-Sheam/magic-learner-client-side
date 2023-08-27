import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const ActiveLink = ({ to, children }) => {
    const { theme } = useAuth();
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-bandOrange"
                    : ""

            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;