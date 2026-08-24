import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";
import type { Product } from "../types/product";

import "../App.css";
import { useCart } from "../context/CartContext";


function ProductDetails() {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(
                    `/products/orchids/${id}/`
                );

                setProduct(response.data);
            } catch (err: any) {
                console.error("PRODUCT DETAILS ERROR:", err);
                console.error("RESPONSE:", err.response);

                setError(
                    err.response?.data
                        ? JSON.stringify(err.response.data)
                        : err.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    if (loading) {
        return (
            <div className="product-details-loading">
                <h2>Loading orchid...</h2>
            </div>
        );
    }


    if (error) {
        return (
            <div className="product-details-error">
                <h2>Something went wrong</h2>
                <p>{error}</p>

                <Link to="/products">
                    ← Back to Orchids
                </Link>
            </div>
        );
    }


    if (!product) {
        return (
            <div className="product-details-error">
                <h2>Orchid not found</h2>

                <Link to="/products">
                    ← Back to Orchids
                </Link>
            </div>
        );
    }

    

    return (
        <div className="product-details-page">

            {/* Back Button */}

            <Link
                to="/products"
                className="back-to-products"
            >
                ← Back to Orchids
            </Link>


            <div className="product-details-card">

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="product-details-image">

                    {product.primary_image ? (
                        <img
                            src={product.primary_image}
                            alt={product.name}
                        />
                    ) : (
                        <div className="details-no-image">
                            No Image Available
                        </div>
                    )}

                </div>


                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div className="product-details-info">

                    <span className="details-category">
                        {product.category_name}
                    </span>


                    <h1>
                        {product.name}
                    </h1>


                    <p className="details-description">
                        {product.description}
                    </p>


                    <div className="details-price">
                        Rs. {Number(product.price).toLocaleString()}
                    </div>


                    <div className="details-stock">

                        {product.stock_quantity > 0 ? (
                            <span className="stock-available">
                                ● In Stock
                            </span>
                        ) : (
                            <span className="stock-unavailable">
                                ● Out of Stock
                            </span>
                        )}

                        <span>
                            {product.stock_quantity} available
                        </span>

                    </div>


                    {/* =================================================
                        CARE INFORMATION
                    ================================================= */}

                    <div className="care-information">

                        <div className="care-item">
                            <span className="care-label">
                                Size
                            </span>

                            <span className="care-value">
                                {product.size || "Not specified"}
                            </span>
                        </div>


                        <div className="care-item">
                            <span className="care-label">
                                Care Level
                            </span>

                            <span className="care-value">
                                {product.care_level || "Not specified"}
                            </span>
                        </div>


                        <div className="care-item">
                            <span className="care-label">
                                Light
                            </span>

                            <span className="care-value">
                                {product.light_requirement || "Not specified"}
                            </span>
                        </div>


                        <div className="care-item">
                            <span className="care-label">
                                Watering
                            </span>

                            <span className="care-value">
                                {product.watering_frequency || "Not specified"}
                            </span>
                        </div>

                    </div>


                    {/* =================================================
                        BUTTON
                    ================================================= */}

                    <button
                        className="add-to-cart-button"
                        disabled={product.stock_quantity === 0}
                        onClick={() => addToCart(product)}
                    >
                        {product.stock_quantity > 0
                            ? "Add to Cart"
                            : "Out of Stock"}
                    </button>

                </div>

            </div>

        </div>
    );
}


export default ProductDetails;