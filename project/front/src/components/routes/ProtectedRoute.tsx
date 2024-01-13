import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@components/../hooks';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
