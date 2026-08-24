import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import "../App.css";


function Checkout() {

    const {
        cartItems,
        cartTotal,
    } = useCart();


    // =========================================================
    // EMPTY CART
    // =========================================================

    if (cartItems.length === 0) {

        return (
            <div className="empty-cart">

                <div className="empty-cart-content">

                    <h1>Your Cart is Empty 🛒</h1>

                    <p>
                        Please add some orchids before checking out.
                    </p>

                    <Link
                        to="/products"
                        className="continue-shopping-button"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>
        );
    }


    // =========================================================
    // CHECKOUT
    // =========================================================

    return (
        <div className="checkout-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="checkout-header">

                <Link
                    to="/cart"
                    className="back-to-cart"
                >
                    ← Back to Cart
                </Link>

                <h1>
                    Checkout
                </h1>

                <p>
                    Complete your details to place your order.
                </p>

            </div>


            <div className="checkout-layout">


                {/* =================================================
                    CUSTOMER DETAILS
                ================================================= */}

                <div className="checkout-form-card">

                    <h2>
                        Delivery Information
                    </h2>


                    <form>


                        {/* NAME */}

                        <div className="form-row">

                            <div className="checkout-form-group">

                                <label htmlFor="firstName">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    required
                                />

                            </div>


                            <div className="checkout-form-group">

                                <label htmlFor="lastName">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    required
                                />

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="checkout-form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />

                        </div>


                        {/* PHONE */}

                        <div className="checkout-form-group">

                            <label htmlFor="phone">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                required
                            />

                        </div>


                        {/* ADDRESS */}

                        <div className="checkout-form-group">

                            <label htmlFor="address">
                                Delivery Address
                            </label>

                            <textarea
                                id="address"
                                name="address"
                                placeholder="Enter your delivery address"
                                rows={4}
                                required
                            />

                        </div>


                        {/* CITY + POSTAL CODE */}

                        <div className="form-row">

                            <div className="checkout-form-group">

                                <label htmlFor="city">
                                    City
                                </label>

                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Enter your city"
                                    required
                                />

                            </div>


                            <div className="checkout-form-group">

                                <label htmlFor="postalCode">
                                    Postal Code
                                </label>

                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    placeholder="Postal code"
                                    required
                                />

                            </div>

                        </div>


                        {/* PROVINCE */}

                        <div className="checkout-form-group">

                            <label htmlFor="province">
                                Province
                            </label>

                            <select
                                id="province"
                                name="province"
                                required
                                defaultValue=""
                            >

                                <option value="" disabled>
                                    Select Province
                                </option>

                                <option value="Western">
                                    Western Province
                                </option>

                                <option value="Central">
                                    Central Province
                                </option>

                                <option value="Southern">
                                    Southern Province
                                </option>

                                <option value="Northern">
                                    Northern Province
                                </option>

                                <option value="Eastern">
                                    Eastern Province
                                </option>

                                <option value="North Western">
                                    North Western Province
                                </option>

                                <option value="North Central">
                                    North Central Province
                                </option>

                                <option value="Uva">
                                    Uva Province
                                </option>

                                <option value="Sabaragamuwa">
                                    Sabaragamuwa Province
                                </option>

                            </select>

                        </div>


                        {/* PAYMENT METHOD */}

                        <div className="checkout-payment-section">

                            <h2>
                                Payment Method
                            </h2>


                            <label className="payment-option">

                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    defaultChecked
                                />

                                <div>

                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <span>
                                        Pay when your orchid is delivered.
                                    </span>

                                </div>

                            </label>


                            <label className="payment-option">

                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                />

                                <div>

                                    <strong>
                                        Card Payment
                                    </strong>

                                    <span>
                                        Pay securely using your card.
                                    </span>

                                </div>

                            </label>

                        </div>


                        {/* PLACE ORDER */}

                        <button
                            type="submit"
                            className="place-order-button"
                        >
                            Place Order
                        </button>

                    </form>

                </div>


                {/* =================================================
                    ORDER SUMMARY
                ================================================= */}

                <div className="checkout-summary">

                    <h2>
                        Your Order
                    </h2>


                    {/* ITEMS */}

                    <div className="checkout-items">

                        {cartItems.map((item) => (

                            <div
                                className="checkout-item"
                                key={item.product.id}
                            >

                                {/* IMAGE */}

                                <div className="checkout-item-image">

                                    {item.product.primary_image ? (

                                        <img
                                            src={item.product.primary_image}
                                            alt={item.product.name}
                                        />

                                    ) : (

                                        <div className="checkout-no-image">
                                            No Image
                                        </div>

                                    )}

                                </div>


                                {/* INFO */}

                                <div className="checkout-item-info">

                                    <h3>
                                        {item.product.name}
                                    </h3>

                                    <p>
                                        Qty: {item.quantity}
                                    </p>

                                    <span>
                                        Rs. {
                                            (
                                                Number(
                                                    item.product.price
                                                ) *
                                                item.quantity
                                            ).toLocaleString()
                                        }
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* SUMMARY */}

                    <div className="checkout-summary-details">

                        <div className="checkout-summary-row">

                            <span>
                                Subtotal
                            </span>

                            <span>
                                Rs. {cartTotal.toLocaleString()}
                            </span>

                        </div>


                        <div className="checkout-summary-row">

                            <span>
                                Delivery
                            </span>

                            <span>
                                Calculated at checkout
                            </span>

                        </div>


                        <div className="checkout-summary-divider"></div>


                        <div className="checkout-summary-total">

                            <span>
                                Total
                            </span>

                            <span>
                                Rs. {cartTotal.toLocaleString()}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default Checkout;