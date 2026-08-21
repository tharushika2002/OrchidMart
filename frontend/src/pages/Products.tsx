import { useEffect, useState } from "react";

import api from "../services/api";
import type { Product } from "../types/product";

import "../App.css";


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
        <div className="products-page">
            <h1>Our Orchids</h1>

            <div className="products-grid">
                {products.map((product) => (
                    <div
                        className="product-card"
                        key={product.id}
                    >
                        <div className="product-image">
                            {product.primary_image ? (
                                <img
                                    src={product.primary_image}
                                    alt={product.name}
                                />
                            ) : (
                                <div className="no-image">
                                    No Image
                                </div>
                            )}
                        </div>

                        <div className="product-info">
                            <span className="product-category">
                                {product.category_name}
                            </span>

                            <h2>{product.name}</h2>

                            <p className="product-description">
                                {product.description}
                            </p>

                            <div className="product-bottom">
                                <span className="product-price">
                                    Rs. {product.price}
                                </span>

                                <span className="product-stock">
                                    Stock: {product.stock_quantity}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <p>No orchids available.</p>
            )}
        </div>
    );
}

export default Products;