import { Link, useLocation } from "react-router-dom";

import "../App.css";


interface OrderSuccessData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    payment_method: string;
    status: string;
    subtotal: string;
    delivery_fee: string;
    total: string;
}


function OrderSuccess() {

    const location = useLocation();


    const order =
        location.state?.order as
        OrderSuccessData | undefined;


    // =========================================================
    // NO ORDER DATA
    // =========================================================

    if (!order) {

        return (

            <div className="order-success-page">

                <div className="order-success-card">

                    <div className="success-icon">
                        ⚠️
                    </div>

                    <h1>
                        Order Information Not Found
                    </h1>

                    <p>
                        We couldn't find the order information.
                    </p>

                    <Link
                        to="/products"
                        className="success-button"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>

        );

    }


    // =========================================================
    // SUCCESS PAGE
    // =========================================================

    return (

        <div className="order-success-page">

            <div className="order-success-card">


                {/* =================================================
                    SUCCESS ICON
                ================================================= */}

                <div className="success-icon">

                    ✓

                </div>


                {/* =================================================
                    TITLE
                ================================================= */}

                <h1>

                    Order Placed Successfully!

                </h1>


                <p className="success-message">

                    Thank you for your order,
                    {" "}
                    {order.first_name}!

                </p>


                <p className="success-email">

                    A confirmation will be sent to
                    {" "}
                    {order.email}.

                </p>


                {/* =================================================
                    ORDER NUMBER
                ================================================= */}

                <div className="order-number-box">

                    <span>
                        Order Number
                    </span>

                    <strong>
                        #{order.id}
                    </strong>

                </div>


                {/* =================================================
                    ORDER DETAILS
                ================================================= */}

                <div className="success-order-details">


                    <div className="success-detail-row">

                        <span>
                            Customer
                        </span>

                        <strong>

                            {order.first_name}
                            {" "}
                            {order.last_name}

                        </strong>

                    </div>


                    <div className="success-detail-row">

                        <span>
                            Payment Method
                        </span>

                        <strong>

                            {order.payment_method === "COD"
                                ? "Cash on Delivery"
                                : "Card Payment"}

                        </strong>

                    </div>


                    <div className="success-detail-row">

                        <span>
                            Order Status
                        </span>

                        <strong className="order-status">

                            {order.status}

                        </strong>

                    </div>


                    <div className="success-detail-row">

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


                    <div className="success-detail-row">

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


                    <div className="success-divider"></div>


                    <div className="success-total-row">

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


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="success-actions">

                    <Link
                        to="/products"
                        className="success-button"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>

    );

}


export default OrderSuccess;