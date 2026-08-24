import { useEffect, useState } from "react";

import api from "../services/api";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";

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


    /* =========================
       LOADING
       ========================= */

    if (loading) {
        return (
            <div className="products-status">
                <div className="loading-spinner"></div>
                <h2>Loading orchids...</h2>
            </div>
        );
    }


    /* =========================
       ERROR
       ========================= */

    if (error) {
        return (
            <div className="products-status error">
                <h2>Something went wrong</h2>

                <p>{error}</p>

                <Link to="/products">
                    Try Again
                </Link>
            </div>
        );
    }


    return (
        <div className="products-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="products-header">

                <span className="products-subtitle">
                    BEAUTIFUL • NATURAL • ELEGANT
                </span>

                <h1>
                    Our Orchids
                </h1>

                <p>
                    Discover beautiful orchids carefully selected
                    for your home and garden.
                </p>

            </div>


            {/* =========================
                PRODUCTS GRID
            ========================= */}

            {products.length > 0 ? (

                <div className="products-grid">

                    {products.map((product) => (

                        <div
                            className="product-card"
                            key={product.id}
                        >

                            {/* IMAGE */}

                            <div className="product-image">

                                {product.primary_image ? (

                                    <img
                                        src={product.primary_image}
                                        alt={product.name}
                                    />

                                ) : (

                                    <div className="no-image">
                                        No Image Available
                                    </div>

                                )}

                            </div>


                            {/* INFORMATION */}

                            <div className="product-info">

                                {/* CATEGORY */}

                                <span className="product-category">
                                    {product.category_name}
                                </span>


                                {/* NAME */}

                                <h2>
                                    {product.name}
                                </h2>


                                {/* DESCRIPTION */}

                                <p className="product-description">
                                    {product.description}
                                </p>


                                {/* BOTTOM */}

                                <div className="product-bottom">

                                    <div className="product-meta">

                                        <span className="product-price">
                                            Rs. {product.price}
                                        </span>

                                        <span className="product-stock">
                                            {product.stock_quantity > 0
                                                ? `${product.stock_quantity} available`
                                                : "Out of Stock"}
                                        </span>

                                    </div>


                                    {/* VIEW DETAILS */}

                                    <Link
                                        to={`/products/${product.id}`}
                                        className="view-details-button"
                                    >
                                        View Details
                                        <span className="view-arrow">
                                            →
                                        </span>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="no-products">

                    <h2>
                        No Orchids Available
                    </h2>

                    <p>
                        There are currently no orchids available.
                    </p>

                </div>

            )}

        </div>
    );
}


export default Products;