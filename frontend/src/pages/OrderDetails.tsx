import { useEffect, useState } from "react";

import {
    Link,
    useParams,
} from "react-router-dom";

import api from "../services/api";

import "../App.css";


interface OrderItem {

    product: number;

    product_name: string;

    quantity: number;

    unit_price: string;

    total_price: string;

}


interface Order {

    id: number;

    first_name: string;

    last_name: string;

    email: string;

    phone: string;

    address: string;

    city: string;

    postal_code: string;

    province: string;

    payment_method: string;

    status: string;

    subtotal: string;

    delivery_fee: string;

    total: string;

    created_at: string;

    items: OrderItem[];

}


function OrderDetails() {

    const {
        id,
    } = useParams<{ id: string }>();


    const [order, setOrder] =
        useState<Order | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =========================================================
    // FETCH ORDER
    // =========================================================

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const response = await api.get(
                    `/orders/${id}/`
                );

                setOrder(
                    response.data
                );

            } catch (err: any) {

                console.error(
                    "ORDER DETAILS ERROR:",
                    err
                );

                setError(
                    err.response?.data
                        ? JSON.stringify(
                            err.response.data
                        )
                        : "Failed to load order."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchOrder();

    }, [id]);


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="products-status">

                <div className="loading-spinner"></div>

                <h2>
                    Loading order...
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

                <Link to="/orders">

                    ← Back to Orders

                </Link>

            </div>

        );

    }


    // =========================================================
    // ORDER NOT FOUND
    // =========================================================

    if (!order) {

        return (

            <div className="products-status">

                <h2>
                    Order not found
                </h2>

                <Link to="/orders">

                    ← Back to Orders

                </Link>

            </div>

        );

    }


    // =========================================================
    // ORDER DETAILS
    // =========================================================

    return (

        <div className="order-details-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="order-details-header">

                <div>

                    <Link
                        to="/orders"
                        className="back-to-cart"
                    >
                        ← Back to Orders
                    </Link>


                    <h1>

                        Order #{order.id}

                    </h1>


                    <p>

                        Placed on{" "}

                        {new Date(
                            order.created_at
                        ).toLocaleString()}

                    </p>

                </div>


                <span
                    className={`order-status-badge ${order.status.toLowerCase()}`}
                >

                    {order.status}

                </span>

            </div>


            <div className="order-details-layout">


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div className="order-details-main">


                    {/* =============================================
                        ORDER ITEMS
                    ============================================= */}

                    <div className="order-details-card">

                        <h2>

                            Order Items

                        </h2>


                        <div className="order-items-list">


                            {order.items.map(
                                (item, index) => (

                                    <div
                                        className="order-detail-item"
                                        key={index}
                                    >


                                        <div>

                                            <h3>

                                                {item.product_name}

                                            </h3>


                                            <p>

                                                Quantity: {
                                                    item.quantity
                                                }

                                            </p>


                                            <p>

                                                Unit Price: Rs. {

                                                    Number(
                                                        item.unit_price
                                                    ).toLocaleString()

                                                }

                                            </p>

                                        </div>


                                        <strong>

                                            Rs. {

                                                Number(
                                                    item.total_price
                                                ).toLocaleString()

                                            }

                                        </strong>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* =============================================
                        DELIVERY INFORMATION
                    ============================================= */}

                    <div className="order-details-card">

                        <h2>

                            Delivery Information

                        </h2>


                        <div className="delivery-info">


                            <p>

                                <strong>

                                    {order.first_name}
                                    {" "}
                                    {order.last_name}

                                </strong>

                            </p>


                            <p>

                                {order.email}

                            </p>


                            <p>

                                {order.phone}

                            </p>


                            <p>

                                {order.address}

                            </p>


                            <p>

                                {order.city},
                                {" "}
                                {order.province}

                            </p>


                            <p>

                                {order.postal_code}

                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ORDER SUMMARY
                ================================================= */}

                <div className="order-details-summary">


                    <h2>

                        Order Summary

                    </h2>


                    <div className="order-summary-row">

                        <span>

                            Payment Method

                        </span>


                        <strong>

                            {order.payment_method === "COD"
                                ? "Cash on Delivery"
                                : "Card Payment"}

                        </strong>

                    </div>


                    <div className="order-summary-row">

                        <span>

                            Subtotal

                        </span>


                        <strong>

                            Rs. {

                                Number(
                                    order.subtotal
                                ).toLocaleString()

                            }

                        </strong>

                    </div>


                    <div className="order-summary-row">

                        <span>

                            Delivery

                        </span>


                        <strong>

                            {Number(
                                order.delivery_fee
                            ) === 0

                                ? "Free"

                                : `Rs. ${Number(
                                    order.delivery_fee
                                ).toLocaleString()}`}

                        </strong>

                    </div>


                    <div className="order-summary-divider"></div>


                    <div className="order-grand-total">

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

            </div>

        </div>

    );

}


export default OrderDetails;