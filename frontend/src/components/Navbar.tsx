import { Link, useLocation } from "react-router-dom";

import { useCart } from "../context/CartContext";

import "../App.css";


function Navbar() {

    const location = useLocation();

    const { cartCount } = useCart();


    return (

        <header className="navbar">

            {/* =================================================
                LOGO
            ================================================= */}

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


            {/* =================================================
                NAVIGATION LINKS
            ================================================= */}

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
                        location.pathname === "/products"
                            ? "navbar-link active"
                            : "navbar-link"
                    }
                >
                    Orchids
                </Link>


                <Link
                    to="/orders"
                    className={
                        location.pathname === "/orders"
                            ? "navbar-link active"
                            : "navbar-link"
                    }
                >
                    My Orders
                </Link>

            </nav>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="navbar-actions">


                {/* NOTIFICATIONS */}

                <button
                    className="navbar-icon-button"
                    title="Notifications"
                >
                    🔔

                    <span className="notification-dot"></span>

                </button>


                {/* CART */}

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


                {/* LOGIN */}

                <Link
                    to="/login"
                    className="navbar-login-button"
                >
                    Login
                </Link>

            </div>

        </header>

    );

}


export default Navbar;