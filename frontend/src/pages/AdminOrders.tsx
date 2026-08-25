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


function AdminOrders() {

    const [orders, setOrders] =
        useState<Order[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [updatingOrderId, setUpdatingOrderId] =
        useState<number | null>(null);


    // =========================================================
    // FETCH ORDERS
    // =========================================================

    const fetchOrders = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "/orders/"
            );

            setOrders(
                response.data
            );

        } catch (err: any) {

            console.error(
                "ADMIN ORDERS ERROR:",
                err
            );

            setError(
                err.response?.data
                    ? JSON.stringify(err.response.data)
                    : "Failed to load orders."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchOrders();

    }, []);


    // =========================================================
    // UPDATE STATUS
    // =========================================================

    const updateOrderStatus = async (
        orderId: number,
        newStatus: string
    ) => {

        try {

            setUpdatingOrderId(orderId);


            const response = await api.patch(

                `/orders/${orderId}/status/`,

                {
                    status: newStatus,
                }

            );


            setOrders((currentOrders) =>

                currentOrders.map((order) =>

                    order.id === orderId
                        ? response.data
                        : order

                )

            );


        } catch (err: any) {

            console.error(
                "STATUS UPDATE ERROR:",
                err
            );

            alert(
                err.response?.data?.error
                ||
                "Failed to update order status."
            );

        } finally {

            setUpdatingOrderId(null);

        }

    };


    // =========================================================
    // STATISTICS
    // =========================================================

    const totalOrders =
        orders.length;


    const pendingOrders =
        orders.filter(
            (order) =>
                order.status === "PENDING"
        ).length;


    const processingOrders =
        orders.filter(
            (order) =>
                order.status === "PROCESSING"
        ).length;


    const deliveredOrders =
        orders.filter(
            (order) =>
                order.status === "DELIVERED"
        ).length;


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="products-status">

                <div className="loading-spinner"></div>

                <h2>
                    Loading admin dashboard...
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

                <button onClick={fetchOrders}>
                    Try Again
                </button>

            </div>

        );

    }


    return (

        <div className="admin-dashboard">


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="admin-sidebar">


                <div className="admin-brand">

                    <div className="admin-logo">
                        🌸
                    </div>

                    <div>

                        <h2>
                            OrchidMart
                        </h2>

                        <span>
                            ADMIN PANEL
                        </span>

                    </div>

                </div>


                <nav className="admin-nav">


                    <Link
                        to="/admin/orders"
                        className="admin-nav-item active"
                    >
                        📦
                        <span>
                            Orders
                        </span>
                    </Link>


                    <Link
                        to="/products"
                        className="admin-nav-item"
                    >
                        🌸
                        <span>
                            Products
                        </span>
                    </Link>

                </nav>


                <div className="admin-sidebar-footer">

                    <Link
                        to="/products"
                        className="admin-back-shop"
                    >
                        ← Back to Store
                    </Link>

                </div>

            </aside>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="admin-main">


                {/* HEADER */}

                <div className="admin-top-header">

                    <div>

                        <span className="admin-page-label">
                            OVERVIEW
                        </span>

                        <h1>
                            Order Management
                        </h1>

                        <p>
                            Manage customer orders and track their progress.
                        </p>

                    </div>


                    <div className="admin-user">

                        <div className="admin-avatar">
                            A
                        </div>

                        <div>

                            <strong>
                                Administrator
                            </strong>

                            <span>
                                Admin Account
                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="admin-stats">


                    <div className="admin-stat-card">

                        <div className="stat-icon">
                            📦
                        </div>

                        <div>

                            <span>
                                Total Orders
                            </span>

                            <strong>
                                {totalOrders}
                            </strong>

                        </div>

                    </div>


                    <div className="admin-stat-card">

                        <div className="stat-icon pending-icon">
                            ⏳
                        </div>

                        <div>

                            <span>
                                Pending
                            </span>

                            <strong>
                                {pendingOrders}
                            </strong>

                        </div>

                    </div>


                    <div className="admin-stat-card">

                        <div className="stat-icon processing-icon">
                            ⚙️
                        </div>

                        <div>

                            <span>
                                Processing
                            </span>

                            <strong>
                                {processingOrders}
                            </strong>

                        </div>

                    </div>


                    <div className="admin-stat-card">

                        <div className="stat-icon delivered-icon">
                            ✓
                        </div>

                        <div>

                            <span>
                                Delivered
                            </span>

                            <strong>
                                {deliveredOrders}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    ORDERS SECTION
                ================================================= */}

                <section className="admin-orders-section">


                    <div className="admin-section-header">

                        <div>

                            <h2>
                                Recent Orders
                            </h2>

                            <p>
                                Update order status and manage deliveries.
                            </p>

                        </div>


                        <button
                            className="admin-refresh-button"
                            onClick={fetchOrders}
                        >
                            ↻ Refresh
                        </button>

                    </div>


                    <div className="admin-orders-container">


                        {/* TABLE HEADER */}

                        <div className="admin-table-header">

                            <span>
                                Order
                            </span>

                            <span>
                                Customer
                            </span>

                            <span>
                                Date
                            </span>

                            <span>
                                Payment
                            </span>

                            <span>
                                Total
                            </span>

                            <span>
                                Status
                            </span>

                        </div>


                        {/* ORDERS */}

                        <div className="admin-orders-list">

                            {orders.map((order) => (

                                <div
                                    className="admin-order-row"
                                    key={order.id}
                                >


                                    <div className="admin-order-id">

                                        #{order.id}

                                    </div>


                                    <div className="admin-customer">

                                        <strong>

                                            {order.first_name}
                                            {" "}
                                            {order.last_name}

                                        </strong>

                                        <span>

                                            {order.email}

                                        </span>

                                    </div>


                                    <div className="admin-order-date">

                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString()}

                                    </div>


                                    <div className="admin-payment">

                                        {order.payment_method === "COD"
                                            ? "Cash on Delivery"
                                            : "Card Payment"}

                                    </div>


                                    <div className="admin-order-total">

                                        Rs. {
                                            Number(
                                                order.total
                                            ).toLocaleString()
                                        }

                                    </div>


                                    <div className="admin-status-control">

                                        <select
                                            value={order.status}
                                            disabled={
                                                updatingOrderId ===
                                                order.id
                                            }
                                            onChange={(event) =>

                                                updateOrderStatus(

                                                    order.id,

                                                    event.target.value

                                                )

                                            }
                                        >

                                            <option value="PENDING">
                                                PENDING
                                            </option>

                                            <option value="CONFIRMED">
                                                CONFIRMED
                                            </option>

                                            <option value="PROCESSING">
                                                PROCESSING
                                            </option>

                                            <option value="SHIPPED">
                                                SHIPPED
                                            </option>

                                            <option value="DELIVERED">
                                                DELIVERED
                                            </option>

                                            <option value="CANCELLED">
                                                CANCELLED
                                            </option>

                                        </select>


                                        {updatingOrderId ===
                                            order.id && (

                                            <span className="updating-text">

                                                Updating...

                                            </span>

                                        )}

                                    </div>

                                </div>

                            ))}


                            {orders.length === 0 && (

                                <div className="admin-no-orders">

                                    <h3>
                                        No orders found
                                    </h3>

                                    <p>
                                        Orders will appear here when customers place them.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </section>

            </main>

        </div>

    );

}


export default AdminOrders;