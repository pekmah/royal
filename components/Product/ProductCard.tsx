'use client';

import {Barlow} from 'next/font/google';
import CardImageLink from './CardImageLink';
import {ProductEntity, ProductSizes} from '@/types/product/Product';
import {useState} from 'react';
import {useCartContext} from '@/context/CartContext';

interface ProductCardProps {
    product: ProductEntity;
}

const barlow = Barlow({
    style: 'normal',
    weight: '400',
    subsets: ['latin'],
});

const barlowSemi = Barlow({
    style: 'normal',
    weight: '600',
    subsets: ['latin'],
});

export default function ProductCard({product}: ProductCardProps) {
    const {id, name, pricing, thumbnails} = product;
    // console.log(pricing)
    const [activeGauge, setActiveGauge] = useState<ProductSizes | null>(null);
    const {addToCart} = useCartContext()

    return (
        <div className='bg-white justify-between h-full rounded-md shadow-lg flex-col'>
            <div className='h-fit'>
                <CardImageLink
                    name={name}
                    id={id}
                    thumbnail={
                        thumbnails && thumbnails?.length > 0
                            ? thumbnails[0].thumbnail_code
                            : ''
                    }
                />
            </div>

            <h4 className={` text-lightgrey text-start px-4 pt-2 ${barlow.className}`}>{name}</h4>
            <div
                className='w-full px-4  py-2'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 'calc(100% - 161px)',
                }}>

                <div className='h-fit w-full'>
                    <div className={`flex justify-between py-1 ${barlowSemi.className}`}>
                        {activeGauge?.discounted && activeGauge?.percentage_discount ? (
                            <>
								<span>
									Ksh.{' '}
                                    {activeGauge.price *
                                        ((100 - activeGauge?.percentage_discount) / 100)}
								</span>
                                <span className='text-red line-through'>
									Ksh. {activeGauge?.price ?? '-'}
								</span>
                            </>
                        ) : (
                            // <span>Ksh. {activeGauge?.price ?? '-'}</span>
                            <span>Ksh. {pricing && pricing[0]?.price}</span>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export const ProductCardSkeleton = () => {
    return (
        <div className='justify-center rounded-md shadow-lg animate-pulse h-[240px] bg-grey'/>
    );
};
