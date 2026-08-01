import React, { useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {

    const userId = localStorage.getItem("userId");

    return userId ? children : <Navigate to="/auth" replace />;
};

const ProjectRoutes = () => {

    const { currentUser, setCurrentUser } = useAuth();

    useEffect(() => {

        const userId = localStorage.getItem("userId");

        if (userId && !currentUser) {
            setCurrentUser(userId);
        }

    }, [currentUser, setCurrentUser]);

    return useRoutes([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            ),
        },
        {
            path: "/profile",
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            ),
        },
        {
            path: "/auth",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/create",
            element: <Signup />,
        },
    ]);
};

// const ProjectRoutes = () => {
//     return <h1>Hello World</h1>;
// };


export default ProjectRoutes;