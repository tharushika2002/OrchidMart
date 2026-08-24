import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import "../App.css";


function Cart() {

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
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
                        Looks like you haven't added any orchids yet.
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
    // CART
    // =========================================================

    return (
        <div className="cart-page">

            <div className="cart-header">

                <div>

                    <h1>Your Shopping Cart</h1>

                    <p>
                        Review your selected orchids.
                    </p>

                </div>


                <button
                    className="clear-cart-button"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>

            </div>


            <div className="cart-layout">


                {/* =================================================
                    CART ITEMS
                ================================================= */}

                <div className="cart-items">

                    {cartItems.map((item) => (

                        <div
                            className="cart-item"
                            key={item.product.id}
                        >

                            {/* IMAGE */}

                            <div className="cart-item-image">

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

                                    <div className="cart-no-image">
                                        No Image
                                    </div>

                                )}

                            </div>


                            {/* PRODUCT INFO */}

                            <div className="cart-item-info">

                                <span className="cart-category">

                                    {
                                        item.product.category_name
                                    }

                                </span>


                                <h2>

                                    {
                                        item.product.name
                                    }

                                </h2>


                                <p className="cart-item-price">

                                    Rs. {
                                        Number(
                                            item.product.price
                                        ).toLocaleString()
                                    }

                                </p>


                                {/* QUANTITY */}

                                <div className="quantity-controls">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(
                                                item.product.id
                                            )
                                        }
                                    >
                                        −
                                    </button>


                                    <span>
                                        {item.quantity}
                                    </span>


                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                item.product.id
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                            </div>


                            {/* TOTAL */}

                            <div className="cart-item-right">

                                <p className="cart-item-total">

                                    Rs. {
                                        (
                                            Number(
                                                item.product.price
                                            )
                                            *
                                            item.quantity
                                        ).toLocaleString()
                                    }

                                </p>


                                <button
                                    className="remove-cart-item"
                                    onClick={() =>
                                        removeFromCart(
                                            item.product.id
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* =================================================
                    ORDER SUMMARY
                ================================================= */}

                <div className="order-summary">

                    <h2>Order Summary</h2>


                    <div className="summary-row">

                        <span>Subtotal</span>

                        <span>
                            Rs. {
                                cartTotal.toLocaleString()
                            }
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>Delivery</span>

                        <span>
                            Calculated at checkout
                        </span>

                    </div>


                    <div className="summary-divider"></div>


                    <div className="summary-total">

                        <span>Total</span>

                        <span>
                            Rs. {
                                cartTotal.toLocaleString()
                            }
                        </span>

                    </div>


                    <Link
                        to="/checkout"
                        className="checkout-button"
                    >
                        Proceed to Checkout
                    </Link>


                    <Link
                        to="/products"
                        className="continue-shopping-link"
                    >
                        ← Continue Shopping
                    </Link>

                </div>

            </div>

        </div>
    );
}


export default Cart;