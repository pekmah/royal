"use client"

import React, {createContext, useEffect, useState} from 'react';
import AsyncStorageService from "@/services/AsyncStorageService";

// CartContext2
export const CContext = createContext({});

const CartContext2Provider = ({children}) => {
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);


    // retrieve cart data from localstorage
    useEffect(() => {
        const handleCart = async () => {
            const cartData = await AsyncStorageService.getData('_cart');
            const cartId = await AsyncStorageService.getData('_cart_id');

            setCart(cartData || []);

        };

        handleCart();
    }, []);


    return (
        <CContext.Provider
            value={{

                cart,
                setCart,

            }}>
            {children}
        </CContext.Provider>
    );
};

export default CartContext2Provider;
