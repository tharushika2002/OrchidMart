import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../App.css";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setLoading(true);
        setError("");


        try {

            await login(
                username,
                password
            );

            navigate("/products");

        } catch (err: any) {

            console.error(
                "LOGIN ERROR:",
                err
            );

            if (
                err.response?.data?.detail
            ) {

                setError(
                    err.response.data.detail
                );

            } else {

                setError(
                    "Invalid username or password."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-brand">

                    <div className="login-logo">
                        🌸
                    </div>

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Sign in to your OrchidMart account.
                    </p>

                </div>


                {error && (

                    <div className="login-error">

                        {error}

                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >

                    <div className="login-form-group">

                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                            placeholder="Enter your username"
                            required
                        />

                    </div>


                    <div className="login-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter your password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="login-submit-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Login"}

                    </button>

                </form>


                <div className="login-footer">

                    <span>
                        Don't have an account?
                    </span>

                    <Link to="/products">
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>

    );

}


export default Login;