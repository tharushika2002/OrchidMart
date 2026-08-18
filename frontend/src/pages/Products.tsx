import { useEffect, useState } from "react";

import api from "../services/api";
import type { Product } from "../types/product";


function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products/orchids/");
                setProducts(response.data);
            } catch (err: any) {
                console.error("PRODUCT API ERROR:", err);
                console.error("RESPONSE:", err.response);
                console.error("STATUS:", err.response?.status);
                console.error("DATA:", err.response?.data);

                setError(
                    err.response?.data
                        ? JSON.stringify(err.response.data)
                        : err.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <h2>Loading orchids...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            <h1>Our Orchids</h1>

            {products.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>

                    <p>
                        Category: {product.category_name}
                    </p>

                    <p>
                        Price: Rs. {product.price}
                    </p>

                    <p>
                        Stock: {product.stock_quantity}
                    </p>

                    <p>
                        {product.description}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Products;