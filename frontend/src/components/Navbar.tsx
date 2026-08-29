import { Link, useLocation, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import "../App.css";


function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const { cartCount } = useCart();

    const {
        user,
        isAuthenticated,
        logout,
        loading,
    } = useAuth();


    const handleLogout = () => {

        logout();

        navigate("/products");

    };


    const displayName =
        user?.first_name ||
        user?.username ||
        "Account";


    return (

        <header className="navbar">

            <Link
                to="/"
                className="navbar-logo"
            >

                <span className="navbar-logo-icon">
                    🌸
                </span>

                <div className="navbar-logo-text">

                    <strong>
                        OrchidMart
                    </strong>

                    <span>
                        BEAUTIFUL ORCHIDS
                    </span>

                </div>

            </Link>


            <nav className="navbar-links">

                <Link
                    to="/"
                    className={
                        location.pathname === "/"
                            ? "navbar-link active"
                            : "navbar-link"
                    }
                >
                    Home
                </Link>


                <Link
                    to="/products"
                    className={
                        location.pathname.startsWith("/products")
                            ? "navbar-link active"
                            : "navbar-link"
                    }
                >
                    Orchids
                </Link>


                <Link
                    to="/orders"
                    className={
                        location.pathname.startsWith("/orders")
                            ? "navbar-link active"
                            : "navbar-link"
                    }
                >
                    My Orders
                </Link>

            </nav>


            <div className="navbar-actions">

                <button
                    className="navbar-icon-button"
                    title="Notifications"
                >
                    🔔

                    <span className="notification-dot"></span>
                </button>


                <Link
                    to="/cart"
                    className="navbar-cart"
                    title="Shopping Cart"
                >

                    <span className="cart-icon">
                        🛒
                    </span>


                    {cartCount > 0 && (

                        <span className="cart-count">
                            {cartCount}
                        </span>

                    )}

                </Link>


                {!loading && (

                    isAuthenticated && user ? (

                        <div className="navbar-user-section">

                            <div className="navbar-user">

                                <div className="navbar-user-avatar">

                                    {displayName
                                        .charAt(0)
                                        .toUpperCase()}

                                </div>

                                <div className="navbar-user-info">

                                    <span>
                                        Hello
                                    </span>

                                    <strong>
                                        {displayName}
                                    </strong>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="navbar-logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>

                    ) : (

                        <Link
                            to="/login"
                            className="navbar-login-button"
                        >
                            Login
                        </Link>

                    )

                )}

            </div>

        </header>

    );

}


export default Navbar;