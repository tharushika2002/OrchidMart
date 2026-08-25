import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

import Navbar from "./components/Navbar";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";


function App() {

    return (

        <AuthProvider>

            <CartProvider>

                <BrowserRouter>

                    {/* =================================================
                        NAVBAR
                    ================================================= */}

                    <Navbar />


                    {/* =================================================
                        ROUTES
                    ================================================= */}

                    <Routes>

                        {/* HOME */}

                        <Route
                            path="/"
                            element={<Products />}
                        />


                        {/* PRODUCTS */}

                        <Route
                            path="/products"
                            element={<Products />}
                        />


                        {/* PRODUCT DETAILS */}

                        <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                        />


                        {/* CART */}

                        <Route
                            path="/cart"
                            element={<Cart />}
                        />


                        {/* CHECKOUT */}

                        <Route
                            path="/checkout"
                            element={<Checkout />}
                        />


                        {/* ORDER SUCCESS */}

                        <Route
                            path="/order-success"
                            element={<OrderSuccess />}
                        />


                        {/* MY ORDERS */}

                        <Route
                            path="/orders"
                            element={<MyOrders />}
                        />


                        {/* ORDER DETAILS */}

                        <Route
                            path="/orders/:id"
                            element={<OrderDetails />}
                        />


                        {/* ADMIN ORDERS */}

                        <Route
                            path="/admin/orders"
                            element={<AdminOrders />}
                        />

                    </Routes>

                </BrowserRouter>

            </CartProvider>

        </AuthProvider>

    );

}


export default App;