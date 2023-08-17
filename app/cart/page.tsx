"use client"
import CartItem from '@/components/CartItem'
import { useCartContext } from '@/context/CartContext';
import { getCartItems } from '@/services/Cart/getCartItems'
import React from 'react'
import { useQuery } from 'react-query';
import { BsArrowRightShort } from 'react-icons/bs'
import { Barlow } from 'next/font/google';

const barlowSemi = Barlow({
  style: 'normal',
  weight: '600',
  subsets: ['latin'],
});
const barlowMedium = Barlow({
  style: 'normal',
  weight: '500',
  subsets: ['latin'],
});
const barlowNormal = Barlow({
  style: 'normal',
  weight: '400',
  subsets: ['latin'],
});

const Cart = () => {
  const { itemQuantity } = useCartContext()
  // const { data, isLoading, error } = useQuery(
  //     'cartItems',
  //     () => getCartItems(), // Use an inline function to call getCartItems
  //   );
  //   console.log(data)
  return (
    <div>
      {
        itemQuantity > 0 ? (
          <div className='flex w-full justify-between gap-8'>
            <div className='min-w-[60%]'>
              <CartItem />

            </div>
            <div className='flex-1 min-w-[35%]'>
              <div className='shadow-sm w-full h-full'>

                <h3 className={`${barlowSemi.className} py-4 `}>Order Summary</h3>
                <div className='flex w-full justify-between'>
                  <span className={`${barlowNormal.className} text-black/60 `}>Total for item(s)</span>
                  <span className={`${barlowSemi.className} `}>Ksh.200</span>
                </div>
                <div className='flex w-full justify-between py-2'>
                  <span className={`${barlowNormal.className} text-black/60 `}>VAT(%)</span>
                  <span className={`${barlowSemi.className} `}>Ksh.300</span>
                </div>

                <div className='flex w-full justify-between pt-4'>
                  <span className={`${barlowMedium.className} `}>Total</span>
                  <span className={`${barlowSemi.className} `}>Ksh.2,900</span>
                </div>
                <div className='flex gap-4 py-6 w-full justify-center'>
                  <button className='button-secondary border border-red py-1.5 font-bold px-4'>Back To shop</button>
                  <button className="button-primary py-1.5 flex gap-2 items-center ">
                    <span>Checkout</span>
                    <BsArrowRightShort size={25} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default Cart