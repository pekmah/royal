import {useCartContext} from '@/context/CartContext'
import {Barlow} from 'next/font/google';
import React, {useContext, useState} from 'react'
import Image from "next/image";
import {CContext} from "@/context/CartContext2";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

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

const barlowSmall = Barlow({
    style: 'normal',
    weight: '400',
    subsets: ['latin'],
});
// @ts-ignore
const CartItem = ({items}) => {
    const {cart, increaseQuantity, decreaseQuantity, removeFromCart} = useCartContext()
    const {setCart} = useContext(CContext)
    const [activeFinish, setActiveFinish] = useState(null);
    const [activeGauge, setActiveGauge] = useState(null);
    // console.log(items)
    const [pricing, setPricing] = useState([]);

    const handleIncreaseQuantity = (id, pricing) => {
        let itemToUpdate = items.find(item => item?.pricing === pricing);

        let currentCartItem = itemToUpdate?.product?.pricing?.filter(
            item => item?.id === pricing,
        )[0];

        const total_amount = currentCartItem?.gauge_size
            ? currentCartItem?.price *
            itemToUpdate?.measurements?.length *
            (itemToUpdate?.quantity + 1)
            : currentCartItem?.price * (itemToUpdate?.quantity + 1);

        let updatedCartItem = {
            ...itemToUpdate,
            quantity: itemToUpdate?.quantity + 1,
            total_price: total_amount,
        };
        // create new array and replace the old object with the new item
        const newUpdatedArray = items.map(item =>
            item?.pricing === pricing ? updatedCartItem : item,
        );

        // find the item
        setCart(newUpdatedArray);
    };
    const handleDecreaseQuantity = (id, pricing) => {
        let itemToUpdate = items.find(item => item?.pricing === pricing);

        let otherItems = items?.filter(item => item?.pricing !== pricing);

        let currentCartItem = itemToUpdate?.product?.pricing?.filter(
            item => item?.id === pricing,
        )[0];

        const total_amount = currentCartItem?.gauge_size
            ? currentCartItem?.price *
            itemToUpdate?.measurements?.length *
            (itemToUpdate?.quantity - 1)
            : currentCartItem?.price * (itemToUpdate?.quantity - 1);

        if (itemToUpdate?.quantity === 1) {
            return setCart(otherItems);
        }
        let updatedCartItem = {
            ...itemToUpdate,
            quantity: itemToUpdate?.quantity - 1,
            total_price: total_amount,
        };
        // create new array and replace the old object with the new item
        const newUpdatedArray = items.map(item =>
            item?.pricing === pricing ? updatedCartItem : item,
        );

        setCart(newUpdatedArray);
    };
    const handleFinishChange = (id, newValue) => {
        const updatedPricing = pricing.map((p) => {
            if (p.id === id) {
                return {...p, finish: newValue};
            }
            return p;
        });

        setPricing(updatedPricing);
        setActiveFinish(newValue);
    };

    const handleRemove = (pricing_id) => {
        const otherCartItems = items?.filter(item => item?.pricing !== pricing_id)

        setCart(otherCartItems)
    }
    return (
        <div className='w-full  px-4'>
            {
                items.map((item) => {

                    const currentPricing = (item?.product?.pricing?.find((i) => i?.id === item?.pricing))
                    const currentThumbNail = item?.product?.thumbnails?.find(thumb => thumb?.thumbnail_color === item?.color)

                    return (
                        <div key={item?.pricing} className='flex gap-4'>
                            <div className='relative h-[173px] w-[226px]'>
                                <Image
                                    alt={currentThumbNail?.image}
                                    src={
                                        currentThumbNail?.image
                                    }
                                    fill={true}
                                    style={{objectFit: "cover"}}
                                    className="rounded-md"

                                />
                            </div>
                            <div className='w-full px-4'>
                                <h4 className={`${barlowSemi.className} py-4 `}>{item?.product?.name}</h4>
                                <div className=''>
                                    {pricing && (
                                        <div className='grid grid-cols-2 gap-5'>
                                            {item?.measurements?.length && <div className='flex'>
                                                {pricing && pricing[0]?.finish !== null && (
                                                    <div className='flex  justify-between  items-center gap-x-4'>
                                                        <h3 className={`${barlowSemi.className} text-lightgrey`}>Finish:</h3>

                                                        <div
                                                            className={'border border-gray-200 px-2 py-1 flex items-center gap-x-2'}>
                                                            {/*    color */}
                                                            <div
                                                                style={{
                                                                    backgroundColor: item?.color
                                                                }}
                                                                className={`h-5 w-5 rounded-full `}/>

                                                            <span className={'font-barlow'}>
                                                                {currentPricing?.finish}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>}
                                            {item?.measurements?.length && <div className='flex'>
                                                {pricing && pricing[0]?.gauge_size !== null && (
                                                    <div className='flex w-full items-center gap-x-4'>
                                                        <h3 className={`${barlowSemi.className} text-lightgrey`}>Gauge:</h3>
                                                        <div
                                                            className={'border border-gray-200 px-2 py-1 flex items-center gap-x-2'}>


                                                            <span className={'font-barlow'}>
                                                                {item?.measurements?.length} X {item?.measurements?.width}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>}

                                            <div className='flex w-full justify-between gap-x-4'>
                                                <h4 className={`${barlowSemi.className} text-lightgrey`}>
                                                    Cost
                                                </h4>
                                                <span className={`${barlowSmall.className} flex-grow w-full`}>
                        Ksh.{Math.ceil(parseInt(currentPricing?.price) *
                                                    parseFloat(item?.measurements?.length || 1) *
                                                    (item?.quantity))}
                      </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='flex w-full justify-end items-center py-3 '>
                                    <div>
                                        <div className='w-full flex justify-between gap-14 gap items-center py-4'>
                                            <p className={`${barlowSemi.className}font-semibold text-sm`}>Quantity:</p>
                                            <div
                                                className='isolate inline-flex -space-x-px rounded-md shadow-sm text-sm items-center'>
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item?.product?.id, item?.pricing)}
                                                    className='relative inline-flex items-center rounded-l-md px-2 py-2 text-fadegrey bg-grey hover:text-blue'>
                                                    <AiOutlineMinus/>
                                                </button>
                                                <input
                                                    className=' flex w-fit text-center px-2 outline-none font-semibold'
                                                    style={{
                                                        width: '72px',
                                                    }}
                                                    type='number'
                                                    value={item?.quantity}
                                                />
                                                <button
                                                    onClick={() => handleIncreaseQuantity(item?.product?.id, item?.pricing)}
                                                    className='relative inline-flex items-center rounded-r-md px-2 py-2 text-fadegrey bg-grey hover:text-blue'>
                                                    <AiOutlinePlus/>
                                                </button>
                                                <p className="text-fadegrey text-sm px-4">Piece(s)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className={`${barlowMedium.className} px-2 py-1 border border-gray-300 cursor-pointer`}
                                        onClick={() => handleRemove(item?.pricing)}>Remove
                                    </button>
                                </div>
                            </div>
                        </div>)
                })
            }
        </div>
    )
}

export default CartItem
