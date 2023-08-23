"use client"

import React, {Dispatch, SetStateAction, createContext, useEffect, useState} from 'react';
import AsyncStorageService from "@/services/AsyncStorageService";

interface cartProps{
    cart:string[]
    setCart: Dispatch<SetStateAction<string[]>>
}
// CartContext2
 const CContext = createContext({} as cartProps);


const CartContext2Provider = ({children}:{children:React.ReactNode}) => {
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState<string[]>([]);


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
            value={{cart, setCart,}}>
            {children}
        </CContext.Provider>
    )
};
export default CartContext2Provider;
