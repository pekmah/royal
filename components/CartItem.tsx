import { useCartContext } from '@/context/CartContext'
import { ProductSizes } from '@/types/product/Product';
import { Barlow } from 'next/font/google';
import Image from 'next/image'
import React, {useState} from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

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
const CartItem = () => {
  const { cart: { items }, increaseQuantity, decreaseQuantity, removeFromCart } = useCartContext()
  const [activeFinish, setActiveFinish] = useState<string | null>(null);
  const [activeGauge, setActiveGauge] = useState<string | null>(null);
  // console.log(items)
  const [pricing, setPricing] = useState<ProductSizes[]>([]);

  const handleGaugeChange = (id: number, newValue: string) => {
    // Convert newValue to a number before updating the gauge_size
    const newGaugeSize = parseFloat(newValue);
  
    const updatedPricing = pricing.map((p) => {
      if (p.id === id) {
        return { ...p, gauge_size: newGaugeSize };
      }
      return p;
    });
  
    setPricing(updatedPricing);
    setActiveGauge(newValue);
  };
  const handleFinishChange = (id: number, newValue: string) => {
    const updatedPricing = pricing.map((p) => {
      if (p.id === id) {
        return { ...p, finish: newValue };
      }
      return p;
    });

    setPricing(updatedPricing);
    setActiveFinish(newValue);
  };

  return (
    <div className='w-full  px-4'>
      {
        items.map(({ id, pricing, name, thumbnails, qty }) => {
          const thumbnail =
            thumbnails && thumbnails?.length > 0
              ? thumbnails[0].thumbnail_code
              : null;
          // console.log(thumbnail)
          return (
            <div key={id} className='flex gap-4'>
              <div className='relative h-[173px] w-[226px]'>
                <Image
                  alt={`/${name}/image`}
                  src={
                    thumbnail
                        ? `${process.env.BASE_URL}/api/v1/core/products/thumbnail/${thumbnail}`
                        : "/temp-product-img.png"
                }
                  fill={true}
                  style={{ objectFit: "cover"}}
                  className="rounded-md"

                />
              </div>
              <div className='w-full px-4'>
                <h4 className={`${barlowSemi.className} py-4 `}>{name}</h4>
                <div className=''>
                {pricing && (
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex'>
                      {pricing && pricing[0]?.finish !== null && (
                         <div className='flex w-full justify-between gap-20'>
                         <h3 className={`${barlowSemi.className} text-lightgray`}>Finish:</h3>
                         <select
                              className={`${barlowSmall.className} text-lightgray`}
                              value={activeFinish || ''}
                              onChange={(e) => handleFinishChange(id, e.target.value)}
                            >
                              <option value=''>Select Finish</option>
                              {pricing
                                .filter((p, index, self) =>
                                  self.findIndex((s) => s?.finish === p?.finish) === index
                                )
                                .map((p) => (
                                  <option key={p?.id} value={p?.finish}>
                                    {p?.finish}
                                  </option>
                                ))}
                            </select>
                        </div>
                      )}
                    </div>
                    <div className='flex'>
                      {pricing && pricing[0]?.gauge_size !== null && (
                         <div className='flex w-full justify-between gap-20'>
                         <h3 className={`${barlowSemi.className} text-lightgray`}>Gauge:</h3>
                         <select
                            className={`${barlowSmall.className} text-lightgray`}
                            value={activeGauge || ''}
                            onChange={(e) => handleGaugeChange(id, e.target.value)}
                          >
                            <option value=''>Select Gauge</option>
                            {pricing
                              .filter((p, index, self) =>
                                self.findIndex((s) => s?.gauge_size === p?.gauge_size) === index
                              )
                              .map((p) => (
                                <option key={p?.id} value={p?.gauge_size}>
                                  {p?.gauge_size}
                                </option>
                              ))}
                          </select>
                        </div>
                      )}
                    </div>
                    
                    <div className='flex w-full justify-between gap-20'>
                      <h4 className={`${barlowSemi.className} text-lightgray`}>
                        Cost
                      </h4>
                      <span className={`${barlowSmall.className} flex-grow w-full`}>
                        Ksh.{pricing[0]?.price}
                      </span>
                    </div>
                  </div>
                )}
                </div>
                <div className='flex w-full justify-between items-center'>
                  <div>
                    <div className='w-full flex justify-between gap-14 gap items-center py-4'>
                      <p  className={`${barlowSemi.className}font-semibold text-sm`}>Quantity:</p>
                      <div className='isolate inline-flex -space-x-px rounded-md shadow-sm text-sm items-center'>
                        <button
                        onClick={()=>decreaseQuantity(id)}
                          className='relative inline-flex items-center rounded-l-md px-2 py-2 text-fadegray bg-gray hover:text-blue'>
                          <AiOutlineMinus />
                        </button>
                        <input
                          className=' flex w-fit text-center px-2 outline-none font-semibold'
                          style={{
                            width: '72px',
                          }}
                          type='number'
                          value={qty}
                        />
                        <button
                        onClick={()=>increaseQuantity(id)}
                          className='relative inline-flex items-center rounded-r-md px-2 py-2 text-fadegray bg-gray hover:text-blue'>
                          <AiOutlinePlus />
                        </button>
                        <p className="text-fadegray text-sm px-4">Piece(s)</p>
                      </div>
                    </div>
                  </div>
                  <span className={`${barlowMedium.className} cursor-pointer` } onClick={()=>removeFromCart(id, name)}>Remove</span>
                </div>
              </div>
            </div>)
        })
      }
    </div>
  )
}

export default CartItem