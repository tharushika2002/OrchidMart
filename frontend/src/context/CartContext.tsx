import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Product } from "../types/product";


export interface CartItem {
    product: Product;
    quantity: number;
}


interface CartContextType {
    cartItems: CartItem[];

    addToCart: (product: Product) => void;

    removeFromCart: (productId: number) => void;

    increaseQuantity: (productId: number) => void;

    decreaseQuantity: (productId: number) => void;

    clearCart: () => void;

    cartCount: number;

    cartTotal: number;
}


const CartContext = createContext<CartContextType | undefined>(
    undefined
);


interface CartProviderProps {
    children: ReactNode;
}


export function CartProvider({
    children,
}: CartProviderProps) {

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {

        const savedCart = localStorage.getItem(
            "orchidmart_cart"
        );

        if (!savedCart) {
            return [];
        }

        try {
            return JSON.parse(savedCart);
        } catch {
            return [];
        }
    });


    // Save cart to localStorage

    useEffect(() => {

        localStorage.setItem(
            "orchidmart_cart",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);


    // Add product

    const addToCart = (product: Product) => {

        setCartItems((currentItems) => {

            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );


            if (existingItem) {

                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
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
        });
    };


    // Remove product

    const removeFromCart = (productId: number) => {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.product.id !== productId
            )
        );
    };


    // Increase quantity

    const increaseQuantity = (productId: number) => {

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };


    // Decrease quantity

    const decreaseQuantity = (productId: number) => {

        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.product.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter(
                    (item) => item.quantity > 0
                )
        );
    };


    // Clear cart

    const clearCart = () => {
        setCartItems([]);
    };


    // Total quantity

    const cartCount = cartItems.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    // Total price

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total +
            Number(item.product.price) *
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


export function useCart() {

    const context = useContext(CartContext);


    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }


    return context;
}