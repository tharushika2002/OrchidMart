import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useCart } from "../context/CartContext";

import "../App.css";


function Checkout() {

    const navigate = useNavigate();


    const {
        cartItems,
        cartTotal,
        clearCart,
    } = useCart();


    // =========================================================
    // FORM STATE
    // =========================================================

    const [formData, setFormData] = useState({

        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        province: "",
        payment_method: "COD",

    });


    // =========================================================
    // UI STATES
    // =========================================================

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // =========================================================
    // HANDLE INPUT CHANGE
    // =========================================================

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const {
            name,
            value,
        } = event.target;


        setFormData((currentData) => ({

            ...currentData,

            [name]: value,

        }));

    };


    // =========================================================
    // PLACE ORDER
    // =========================================================

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setLoading(true);

        setError("");


        try {

            // =============================================
            // PREPARE ORDER DATA
            // =============================================

            const orderData = {

                ...formData,

                items: cartItems.map((item) => ({

                    product_id: item.product.id,

                    quantity: item.quantity,

                })),

            };


            console.log(
                "ORDER DATA:",
                orderData
            );


            // =============================================
            // SEND ORDER TO DJANGO
            // =============================================

            const response = await api.post(
                "/orders/create/",
                orderData
            );


            console.log(
                "ORDER CREATED:",
                response.data
            );


            // =============================================
            // GET CREATED ORDER
            // =============================================

            const order = response.data.order;


            // =============================================
            // CLEAR CART
            // =============================================

            clearCart();


            // =============================================
            // GO TO SUCCESS PAGE
            // =============================================

            navigate(
                "/order-success",
                {
                    state: {
                        order: order,
                    },
                }
            );


        } catch (err: any) {

            console.error(
                "ORDER API ERROR:",
                err
            );

            console.error(
                "ORDER RESPONSE:",
                err.response
            );


            // =============================================
            // DISPLAY ERROR
            // =============================================

            if (err.response?.data?.error) {

                setError(
                    err.response.data.error
                );

            } else if (err.response?.data) {

                setError(
                    JSON.stringify(
                        err.response.data
                    )
                );

            } else {

                setError(
                    "Something went wrong while placing your order."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // EMPTY CART
    // =========================================================

    if (cartItems.length === 0) {

        return (

            <div className="empty-cart">

                <div className="empty-cart-content">

                    <h1>
                        Your Cart is Empty 🛒
                    </h1>


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


                    {/* ERROR MESSAGE */}

                    {error && (

                        <div className="checkout-error">

                            {error}

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* =========================================
                            NAME
                        ========================================= */}

                        <div className="form-row">


                            <div className="checkout-form-group">

                                <label htmlFor="first_name">

                                    First Name

                                </label>


                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="Enter your first name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="checkout-form-group">

                                <label htmlFor="last_name">

                                    Last Name

                                </label>


                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Enter your last name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        {/* =========================================
                            EMAIL
                        ========================================= */}

                        <div className="checkout-form-group">

                            <label htmlFor="email">

                                Email Address

                            </label>


                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* =========================================
                            PHONE
                        ========================================= */}

                        <div className="checkout-form-group">

                            <label htmlFor="phone">

                                Phone Number

                            </label>


                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* =========================================
                            ADDRESS
                        ========================================= */}

                        <div className="checkout-form-group">

                            <label htmlFor="address">

                                Delivery Address

                            </label>


                            <textarea
                                id="address"
                                name="address"
                                placeholder="Enter your delivery address"
                                rows={4}
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* =========================================
                            CITY + POSTAL CODE
                        ========================================= */}

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
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="checkout-form-group">

                                <label htmlFor="postal_code">

                                    Postal Code

                                </label>


                                <input
                                    type="text"
                                    id="postal_code"
                                    name="postal_code"
                                    placeholder="Postal code"
                                    value={formData.postal_code}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        {/* =========================================
                            PROVINCE
                        ========================================= */}

                        <div className="checkout-form-group">

                            <label htmlFor="province">

                                Province

                            </label>


                            <select
                                id="province"
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                                required
                            >

                                <option value="">

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


                        {/* =========================================
                            PAYMENT METHOD
                        ========================================= */}

                        <div className="checkout-payment-section">


                            <h2>
                                Payment Method
                            </h2>


                            {/* COD */}

                            <label className="payment-option">


                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="COD"
                                    checked={
                                        formData.payment_method === "COD"
                                    }
                                    onChange={handleChange}
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


                            {/* CARD */}

                            <label className="payment-option">


                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="CARD"
                                    checked={
                                        formData.payment_method === "CARD"
                                    }
                                    onChange={handleChange}
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


                        {/* =========================================
                            PLACE ORDER
                        ========================================= */}

                        <button
                            type="submit"
                            className="place-order-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Placing Order..."
                                : "Place Order"}

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


                    {/* =============================================
                        ITEMS
                    ============================================= */}

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
                                            src={
                                                item.product.primary_image
                                            }
                                            alt={
                                                item.product.name
                                            }
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


                    {/* =============================================
                        SUMMARY
                    ============================================= */}

                    <div className="checkout-summary-details">


                        <div className="checkout-summary-row">

                            <span>
                                Subtotal
                            </span>


                            <span>

                                Rs. {
                                    cartTotal.toLocaleString()
                                }

                            </span>

                        </div>


                        <div className="checkout-summary-row">

                            <span>
                                Delivery
                            </span>


                            <span>
                                Free
                            </span>

                        </div>


                        <div className="checkout-summary-divider"></div>


                        <div className="checkout-summary-total">

                            <span>
                                Total
                            </span>


                            <span>

                                Rs. {
                                    cartTotal.toLocaleString()
                                }

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default Checkout;