import type { ReactNode } from "react";

import {
    Navigate,
    useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


interface ProtectedRouteProps {

    children: ReactNode;

}


function ProtectedRoute({

    children,

}: ProtectedRouteProps) {

    const {
        isAuthenticated,
        loading,
    } = useAuth();


    const location =
        useLocation();


    // =========================================================
    // AUTH LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="auth-loading">

                <div className="loading-spinner"></div>

                <p>
                    Checking your account...
                </p>

            </div>

        );

    }


    // =========================================================
    // NOT LOGGED IN
    // =========================================================

    if (!isAuthenticated) {

        return (

            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />

        );

    }


    // =========================================================
    // AUTHENTICATED
    // =========================================================

    return children;

}


export default ProtectedRoute;