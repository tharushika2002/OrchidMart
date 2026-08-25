import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import { CartProvider } from "./context/CartContext";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";


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

                </Routes>

            </BrowserRouter>

        </CartProvider>
    );
}


export default App;