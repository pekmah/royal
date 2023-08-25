"use client"
import CartItem from '@/components/CartItem.js'
import {useCartContext} from '@/context/CartContext';
import React, {useContext, useEffect, useMemo} from 'react'
import {BsArrowRightShort} from 'react-icons/bs'
import {Barlow} from 'next/font/google';
import {useRouter} from 'next/navigation';
import AsyncStorageService from "@/services/AsyncStorageService";
import {CContext} from "@/context/CartContext2.js";
import Image from "next/image";
import empty from '@/public/empty.png'

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
    const {itemQuantity, totalPrice} = useCartContext()
    // @ts-ignore
    const {cart} = useContext(CContext)

    useEffect(() => {
        const handleCart = async () => {
            await AsyncStorageService.setData('_cart', cart);
        };

        handleCart();
    }, [cart]);

    const router = useRouter()

    const subTotal = useMemo(() => {
        return cart?.reduce((acc: number, val: { product: { pricing: any[]; }; pricing: any; measurements: { length: string; }; quantity: number; }) => {
            const currentPricing = val?.product?.pricing
                ?.filter(prod => prod?.id === val?.pricing)
                ?.at(0);
            
            // Extract the relevant numeric values from val
            const quantity = val?.quantity;
            const length = parseFloat(val?.measurements?.length) || 0;
            const price = parseFloat(currentPricing?.price) || 0;
    
            // Calculate single item amount based on pricing and properties
            const singleItemAmount = currentPricing?.gauge_size
                ? price * length * quantity
                : price * quantity;
    
            // Accumulate the single item amount in the accumulator
            return acc + singleItemAmount;
        }, 0);
    }, [cart]);


    const vat = (Math.ceil(parseInt(subTotal))) * 16 / 100
    const total = subTotal + vat
    return (
        <div className={'min-h-[80vh] flex'}>
            {
                    cart?.length >= 1 ? (
                    <div className='flex w-full justify-between gap-8'>
                        <div className='min-w-[60%]'>
                            <CartItem items={cart}/>

                        </div>
                        <div className='flex-1 min-w-[35%]'>
                            <div className='shadow-sm w-full h-full'>

                                <h3 className={`${barlowSemi.className} py-4 `}>Order Summary</h3>
                                <div className='flex w-full justify-between'>
                                    <span
                                        className={`${barlowNormal.className} text-black/60 `}>Total for item(s)</span>
                                    <span className={`${barlowSemi.className} `}>{Math.ceil(parseInt(subTotal))}</span>
                                </div>
                                <div className='flex w-full justify-between py-2'>
                                    <span className={`${barlowNormal.className} text-black/60 `}>VAT( 16% )</span>
                                    <span className={`${barlowSemi.className} `}>{Math.ceil(vat)}</span>
                                </div>

                                <div className='flex w-full justify-between pt-4'>
                                    <span className={`${barlowMedium.className} `}>Total</span>
                                    <span className={`${barlowSemi.className} `}>{Math.ceil(parseInt(total))}</span>
                                </div>
                                <div className='flex gap-4 py-6 w-full justify-center'>
                                    <button onClick={() => router.back()}
                                            className='button-secondary border border-red py-1.5 font-bold px-4'>Back To
                                        shop
                                    </button>
                                    <button className="button-primary py-1.5 flex gap-2 items-center ">
                                        <span>Checkout</span>
                                        <BsArrowRightShort size={25}/>
                                    </button>
                                </div>
                            </div>
                       </div>
                    </div>
                ) : <div className={'flex-1 flex flex-col gap-y-2 justify-center items-center'}>

<Image src={empty} alt={'empty'}/>
                      <h5 className={'font-barlow font-[500] text-gray-400'}>Cart empty. </h5>
                    </div>
            }
        </div>
    )
}

export default Cart