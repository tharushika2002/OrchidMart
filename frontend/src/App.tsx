import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

import { CartProvider } from "./context/CartContext";


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

                </Routes>

            </BrowserRouter>

        </CartProvider>
    );
}


export default App;