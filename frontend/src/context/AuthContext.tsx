import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import api from "../services/api";


interface User {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
}


interface AuthContextType {

    user: User | null;

    accessToken: string | null;

    isAuthenticated: boolean;

    login: (
        username: string,
        password: string
    ) => Promise<void>;

    logout: () => void;

    loading: boolean;
}


const AuthContext =
    createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
    children: ReactNode;
}


export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [user, setUser] =
        useState<User | null>(null);

    const [accessToken, setAccessToken] =
        useState<string | null>(
            localStorage.getItem("access_token")
        );

    const [loading, setLoading] =
        useState(true);


    // =========================================================
    // GET CURRENT USER
    // =========================================================

    useEffect(() => {

        const loadUser = async () => {

            const token =
                localStorage.getItem("access_token");

            if (!token) {

                setLoading(false);

                return;
            }


            try {

                const response =
                    await api.get("/users/me/", {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    });


                setUser(response.data);

            } catch (error) {

                console.error(
                    "AUTH USER ERROR:",
                    error
                );

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );

                setAccessToken(null);

                setUser(null);

            } finally {

                setLoading(false);

            }

        };


        loadUser();

    }, []);


    // =========================================================
    // LOGIN
    // =========================================================

    const login = async (
        username: string,
        password: string
    ) => {

        const response =
            await api.post(
                "/users/login/",
                {
                    username,
                    password,
                }
            );


        const access =
            response.data.access;

        const refresh =
            response.data.refresh;


        localStorage.setItem(
            "access_token",
            access
        );


        localStorage.setItem(
            "refresh_token",
            refresh
        );


        setAccessToken(access);


        // Get logged-in user

        const userResponse =
            await api.get(
                "/users/me/",
                {
                    headers: {
                        Authorization:
                            `Bearer ${access}`,
                    },
                }
            );


        setUser(userResponse.data);

    };


    // =========================================================
    // LOGOUT
    // =========================================================

    const logout = () => {

        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "refresh_token"
        );

        setAccessToken(null);

        setUser(null);

    };


    return (

        <AuthContext.Provider
            value={{
                user,

                accessToken,

                isAuthenticated:
                    !!accessToken && !!user,

                login,

                logout,

                loading,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


// =============================================================
// USE AUTH
// =============================================================

export function useAuth() {

    const context =
        useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    }


    return context;

}