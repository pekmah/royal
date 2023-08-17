import { useCartContext } from '@/context/CartContext'
import { ProductSizes } from '@/types/product/Product'
import Image from 'next/image'
import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface PricingItem {
  id: number;
  finish: string | null;
  gauge_size: string | null;
  price: number;
}

const CartItem = () => {
  const {cart:{items}, } = useCartContext()
  // console.log(items)
 
  return (
    <div>
        {
          items.map(({id, pricing, name, thumbnails,})=>{
            const thumbnail =
            thumbnails && thumbnails?.length > 0
                ? thumbnails[0].thumbnail_code
                : null;
                // console.log(thumbnail)
            return(
               <div key={id} className='flex'>
              <div className='relative h-[173px] w-[226px]'>
              <Image
                        alt={"Landing page Banner"}
                        src={`${thumbnail} `}
                        fill={true}
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        className="rounded-md"
                        
                    />
              </div>
              <div>
                <h4>{name}</h4>
                <div>
                  {pricing && pricing.map((p)=>(
                    <div key={p?.id}>
                      <div>
                        {p?.finish !== null &&(
                          <div>

                            <h3>Finish:</h3>
                            <span>{p?.finish}</span>
                          </div>

                        )}
                          {p?.gauge_size !== null &&(

                        <div>
                            <h3>Gauge:</h3>
                              <span>{p?.gauge_size}</span>
                        
                        </div>
                          )}
                        <div>
                          <h4>Cost</h4>
                          <span>{p?.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div>
                    <div className='w-full flex justify-between items-center py-4'>
			<p className='font-semibold text-sm'>Quantity:</p>
			<div className='isolate inline-flex -space-x-px rounded-md shadow-sm text-sm items-center'>
				<button
					className='relative inline-flex items-center rounded-l-md px-2 py-2 text-fadegray bg-gray hover:text-blue'>
					<AiOutlineMinus />
				</button>
				<p
					className=' flex w-fit text-center px-2 outline-none font-semibold'
					style={{
						width: '72px',
					}}
				
				>0</p>
				<button
					className='relative inline-flex items-center rounded-r-md px-2 py-2 text-fadegray bg-gray hover:text-blue'>
					<AiOutlinePlus />
				</button>
				 <p className="text-fadegray text-sm px-4">Piece(s)</p>
			</div>
		</div>
                  </div>
                  <span>Remove</span>
                </div>
              </div>
            </div>)
})
        }
    </div>
  )
}

export default CartItem