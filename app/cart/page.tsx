"use client"
import CartItem from '@/components/CartItem'
import {getCartItems} from '@/services/Cart/getCartItems'
import React from 'react'
import { useQuery } from 'react-query';

const Cart = () => {
    const { data, isLoading, error } = useQuery(
        'cartItems',
        () => getCartItems(), // Use an inline function to call getCartItems
      );
      console.log(data)
  return (
   <div>Hello</div>
  )
}

export default Cart