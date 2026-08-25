import { useEffect, useState } from "react";

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
                    ? JSON.stringify(
                        err.response.data
                    )
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
    // UPDATE ORDER STATUS
    // =========================================================

    const updateOrderStatus = async (
        orderId: number,
        newStatus: string
    ) => {

        try {

            setUpdatingOrderId(
                orderId
            );


            const response = await api.patch(

                `/orders/${orderId}/status/`,

                {
                    status: newStatus,
                }

            );


            setOrders(
                (currentOrders) =>

                    currentOrders.map(
                        (order) =>

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

            setUpdatingOrderId(
                null
            );

        }

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="products-status">

                <div className="loading-spinner"></div>

                <h2>
                    Loading orders...
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

                <button
                    onClick={fetchOrders}
                >
                    Try Again
                </button>

            </div>

        );

    }


    // =========================================================
    // ADMIN ORDERS PAGE
    // =========================================================

    return (

        <div className="admin-orders-page">


            {/* =============================================
                HEADER
            ============================================= */}

            <div className="admin-orders-header">

                <div>

                    <span className="admin-label">

                        ADMIN PANEL

                    </span>


                    <h1>

                        Order Management

                    </h1>


                    <p>

                        Manage and update customer orders.

                    </p>

                </div>


                <div className="admin-order-count">

                    {orders.length}

                    <span>
                        Total Orders
                    </span>

                </div>

            </div>


            {/* =============================================
                ORDERS TABLE
            ============================================= */}

            <div className="admin-orders-container">


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


                <div className="admin-orders-list">


                    {orders.map(
                        (order) => (

                            <div
                                className="admin-order-row"
                                key={order.id}
                            >


                                {/* ORDER */}

                                <div className="admin-order-id">

                                    #{order.id}

                                </div>


                                {/* CUSTOMER */}

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


                                {/* DATE */}

                                <div className="admin-order-date">

                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}

                                </div>


                                {/* PAYMENT */}

                                <div className="admin-payment">

                                    {order.payment_method === "COD"
                                        ? "Cash on Delivery"
                                        : "Card Payment"}

                                </div>


                                {/* TOTAL */}

                                <div className="admin-order-total">

                                    Rs. {

                                        Number(
                                            order.total
                                        ).toLocaleString()

                                    }

                                </div>


                                {/* STATUS */}

                                <div className="admin-status-control">

                                    <select

                                        value={
                                            order.status
                                        }

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

                        )

                    )}


                    {/* NO ORDERS */}

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

        </div>

    );

}


export default AdminOrders;