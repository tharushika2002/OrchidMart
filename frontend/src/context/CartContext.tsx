import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Product } from "../types/product";
import { useAuth } from "./AuthContext";


export interface CartItem {
    product: Product;
    quantity: number;
}


interface CartContextType {

    cartItems: CartItem[];

    addToCart: (product: Product) => void;

    removeFromCart: (
        productId: number
    ) => void;

    increaseQuantity: (
        productId: number
    ) => void;

    decreaseQuantity: (
        productId: number
    ) => void;

    clearCart: () => void;

    cartCount: number;

    cartTotal: number;
}


const CartContext =
    createContext<CartContextType | undefined>(
        undefined
    );


interface CartProviderProps {
    children: ReactNode;
}


export function CartProvider({
    children,
}: CartProviderProps) {

    const { user, isAuthenticated } =
        useAuth();


    const [cartItems, setCartItems] =
        useState<CartItem[]>([]);


    // =========================================================
    // GET USER-SPECIFIC CART KEY
    // =========================================================

    const getCartKey = () => {

        if (!user) {
            return null;
        }

        return `orchidmart_cart_user_${user.id}`;

    };


    // =========================================================
    // LOAD USER CART WHEN USER CHANGES
    // =========================================================

    useEffect(() => {

        if (!isAuthenticated || !user) {

            setCartItems([]);

            return;

        }


        const cartKey =
            `orchidmart_cart_user_${user.id}`;


        const savedCart =
            localStorage.getItem(cartKey);


        if (!savedCart) {

            setCartItems([]);

            return;

        }


        try {

            setCartItems(
                JSON.parse(savedCart)
            );

        } catch {

            setCartItems([]);

        }

    }, [
        user,
        isAuthenticated,
    ]);


    // =========================================================
    // SAVE USER CART
    // =========================================================

    useEffect(() => {

        const cartKey =
            getCartKey();


        if (
            !isAuthenticated ||
            !user ||
            !cartKey
        ) {

            return;

        }


        localStorage.setItem(
            cartKey,
            JSON.stringify(cartItems)
        );

    }, [
        cartItems,
        user,
        isAuthenticated,
    ]);


    // =========================================================
    // ADD PRODUCT
    // =========================================================

    const addToCart = (
        product: Product
    ) => {

        if (!isAuthenticated || !user) {

            alert(
                "Please login before adding items to your cart."
            );

            return;

        }


        setCartItems(
            (currentItems) => {

                const existingItem =
                    currentItems.find(
                        (item) =>
                            item.product.id === product.id
                    );


                if (existingItem) {

                    return currentItems.map(
                        (item) =>
                            item.product.id ===
                            product.id
                                ? {
                                    ...item,
                                    quantity:
                                        item.quantity + 1,
                                }
                                : item
                    );

                }


                return [
                    ...currentItems,
                    {
                        product,
                        quantity: 1,
                    },
                ];

            }
        );

    };


    // =========================================================
    // REMOVE PRODUCT
    // =========================================================

    const removeFromCart = (
        productId: number
    ) => {

        setCartItems(
            (currentItems) =>
                currentItems.filter(
                    (item) =>
                        item.product.id !==
                        productId
                )
        );

    };


    // =========================================================
    // INCREASE QUANTITY
    // =========================================================

    const increaseQuantity = (
        productId: number
    ) => {

        setCartItems(
            (currentItems) =>
                currentItems.map(
                    (item) =>
                        item.product.id ===
                        productId
                            ? {
                                ...item,
                                quantity:
                                    item.quantity + 1,
                            }
                            : item
                )
        );

    };


    // =========================================================
    // DECREASE QUANTITY
    // =========================================================

    const decreaseQuantity = (
        productId: number
    ) => {

        setCartItems(
            (currentItems) =>
                currentItems
                    .map(
                        (item) =>
                            item.product.id ===
                            productId
                                ? {
                                    ...item,
                                    quantity:
                                        item.quantity - 1,
                                    }
                                : item
                    )
                    .filter(
                        (item) =>
                            item.quantity > 0
                    )
        );

    };


    // =========================================================
    // CLEAR CART
    // =========================================================

    const clearCart = () => {

        setCartItems([]);

    };


    // =========================================================
    // TOTAL QUANTITY
    // =========================================================

    const cartCount =
        cartItems.reduce(
            (total, item) =>
                total +
                item.quantity,
            0
        );


    // =========================================================
    // TOTAL PRICE
    // =========================================================

    const cartTotal =
        cartItems.reduce(
            (total, item) =>
                total +
                Number(
                    item.product.price
                ) *
                item.quantity,
            0
        );


    return (

        <CartContext.Provider
            value={{
                cartItems,

                addToCart,

                removeFromCart,

                increaseQuantity,

                decreaseQuantity,

                clearCart,

                cartCount,

                cartTotal,
            }}
        >

            {children}

        </CartContext.Provider>

    );

}


// =============================================================
// USE CART
// =============================================================

export function useCart() {

    const context =
        useContext(CartContext);


    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }


    return context;

}