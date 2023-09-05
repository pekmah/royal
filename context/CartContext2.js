"use client";
import React, {createContext, useEffect, useState} from "react";
import AsyncStorageService from "@/services/AsyncStorageService";

// CartContext2
// interface cartProps{

//     setCart:React.Dispatch<React.SetStateAction<{}>>
// }
export const CContext = createContext({});

const CartContext2Provider = ({ children }) => {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [checkout, setCheckout] = useState({
    cartId: null,
    location: {
      chosenLocation: {},
      loc: [],
      customerLocations: [],
      pickupPoints: [],
      pickupPoint: {},
      phone: "",
      googleLocation: {},
    },
    del_option: "", // PICKUP/DOORSTEP
    payment: {
      type: "FULL_PAYMENT", //FULL_PAYMENT,3_MONTHS,6_MONTHS,9_MONTHS,12_MONTHS
      option: "MPESA", // CARD|MPESA,
      cardDetails: {},
      phone: "",
    },
    paymentType: "full",
    isCheckingOut: false,
    orderRequest: {},
    isEditing: false,
    editScreen: "",
  });

  // retrieve cart data from localstorage
  useEffect(() => {
    const handleCart = async () => {
      const cartData = await AsyncStorageService.getData("_cart");
      const cartId = await AsyncStorageService.getData("_cart_id");

      setCart(cartData || []);
    };

    handleCart();
  }, []);
  // console.log(cart)

  return (
    <CContext.Provider
      value={{
        cart,
        setCart,
        favorites,
        setFavorites,
        checkout,
        setCheckout,
      }}
    >
      {children}
    </CContext.Provider>
  );
};

export default CartContext2Provider;
