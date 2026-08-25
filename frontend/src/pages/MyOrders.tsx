import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import "../App.css";


interface Order {
    id: number;

    first_name: string;
    last_name: string;

    email: string;

    payment_method: string;

    status: string;

    total: string;

    created_at: string;
}


function MyOrders() {

    const [orders, setOrders] = useState<Order[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================================================
    // FETCH ORDERS
    // =========================================================

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response = await api.get(
                    "/orders/"
                );

                setOrders(
                    response.data
                );

            } catch (err: any) {

                console.error(
                    "ORDERS API ERROR:",
                    err
                );

                setError(
                    err.response?.data
                        ? JSON.stringify(
                            err.response.data
                        )
                        : "Failed to load orders."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchOrders();

    }, []);


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="products-status">

                <div className="loading-spinner"></div>

                <h2>
                    Loading your orders...
                </h2>

            </div>

        );

    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (

            <div className="products-status error">

                <h2>
                    Something went wrong
                </h2>

                <p>
                    {error}
                </p>

                <Link to="/products">

                    Back to Products

                </Link>

            </div>

        );

    }


    // =========================================================
    // NO ORDERS
    // =========================================================

    if (orders.length === 0) {

        return (

            <div className="empty-cart">

                <div className="empty-cart-content">

                    <h1>
                        No Orders Yet 📦
                    </h1>

                    <p>
                        You haven't placed any orders yet.
                    </p>

                    <Link
                        to="/products"
                        className="continue-shopping-button"
                    >
                        Start Shopping
                    </Link>

                </div>

            </div>

        );

    }


    // =========================================================
    // ORDERS PAGE
    // =========================================================

    return (

        <div className="my-orders-page">


            {/* HEADER */}

            <div className="my-orders-header">

                <div>

                    <Link
                        to="/products"
                        className="back-to-cart"
                    >
                        ← Continue Shopping
                    </Link>

                    <h1>
                        My Orders
                    </h1>

                    <p>
                        View and track your orchid orders.
                    </p>

                </div>

            </div>


            {/* ORDERS LIST */}

            <div className="orders-list">


                {orders.map((order) => (

                    <div
                        className="order-card"
                        key={order.id}
                    >


                        {/* LEFT */}

                        <div className="order-card-main">


                            <div className="order-number">

                                <span>
                                    Order
                                </span>

                                <h2>
                                    #{order.id}
                                </h2>

                            </div>


                            <div className="order-info">

                                <span>
                                    Customer
                                </span>

                                <strong>

                                    {order.first_name}
                                    {" "}
                                    {order.last_name}

                                </strong>

                            </div>


                            <div className="order-info">

                                <span>
                                    Date
                                </span>

                                <strong>

                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}

                                </strong>

                            </div>


                            <div className="order-info">

                                <span>
                                    Payment
                                </span>

                                <strong>

                                    {order.payment_method === "COD"
                                        ? "Cash on Delivery"
                                        : "Card Payment"}

                                </strong>

                            </div>


                            <div className="order-info">

                                <span>
                                    Total
                                </span>

                                <strong>

                                    Rs. {
                                        Number(
                                            order.total
                                        ).toLocaleString()
                                    }

                                </strong>

                            </div>

                        </div>


                        {/* RIGHT */}

                        <div className="order-card-actions">


                            <span
                                className={`order-status-badge ${order.status.toLowerCase()}`}
                            >

                                {order.status}

                            </span>


                            <Link
                                to={`/orders/${order.id}`}
                                className="view-order-button"
                            >

                                View Details →

                            </Link>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}


export default MyOrders;