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
import { CartProvider } from "./context/CartContext";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";


function App() {

    return (
        <CartProvider>

            <BrowserRouter>

                <Routes>

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
                        element={<Cart />}
                    />

                    <Route
                        path="/checkout"
                        element={<Checkout />}
                    />

                    <Route
                        path="/order-success"
                        element={<OrderSuccess />}
                    />

                    <Route
                        path="/orders"
                        element={<MyOrders />}
                    />

                    <Route
                        path="/orders/:id"
                        element={<OrderDetails />}
                    />

                    <Route
                        path="/admin/orders"
                        element={<AdminOrders />}
                    />

                </Routes>

            </BrowserRouter>

        </CartProvider>
    );
}


export default App;