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
import Login from "./pages/Login";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";


function App() {

    return (

        <AuthProvider>

            <CartProvider>

                <BrowserRouter>

                    <Navbar />


                    <Routes>

                        {/* =================================================
                            PUBLIC ROUTES
                        ================================================= */}

                        <Route
                            path="/"
                            element={<Products />}
                        />


                        <Route
                            path="/products"
                            element={<Products />}
                        />


                        <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                        />


                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>

                                    <Cart />

                                </ProtectedRoute>
                            }
                        />


                        {/* =================================================
                            LOGIN
                        ================================================= */}

                        <Route
                            path="/login"
                            element={<Login />}
                        />


                        {/* =================================================
                            PROTECTED ROUTES
                        ================================================= */}

                        <Route
                            path="/checkout"
                            element={
                                <ProtectedRoute>

                                    <Checkout />

                                </ProtectedRoute>
                            }
                        />


                        <Route
                            path="/order-success"
                            element={
                                <ProtectedRoute>

                                    <OrderSuccess />

                                </ProtectedRoute>
                            }
                        />


                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute>

                                    <MyOrders />

                                </ProtectedRoute>
                            }
                        />


                        <Route
                            path="/orders/:id"
                            element={
                                <ProtectedRoute>

                                    <OrderDetails />

                                </ProtectedRoute>
                            }
                        />


                        {/* =================================================
                            ADMIN
                        ================================================= */}

                        <Route
                            path="/admin/orders"
                            element={
                                <ProtectedRoute>

                                    <AdminOrders />

                                </ProtectedRoute>
                            }
                        />

                    </Routes>

                </BrowserRouter>

            </CartProvider>

        </AuthProvider>

    );

}


export default App;