import Image, { StaticImageData } from 'next/image'

import React from 'react'

import { RequestProps } from './RecievedQuotes'

import { MdDeleteOutline } from 'react-icons/md'

import { Barlow } from 'next/font/google'




interface sharedProps {

        requests: RequestProps[]

}







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




const Shared:React.FC<sharedProps> = ({requests}) => {

    // console.log(requests)

  return (

    <div className='grid grid-cols-3 gap-4'>

        {

            requests.map(({id, image, plan, button})=>(

                <div key={id} className='flex flex-col gap-4'>

                    <div className='relative rounded-2xl w-[275px] h-[160px]'>

                        <Image src={image} alt='/' 

                            fill priority

                        />




                    </div>

                    <h4 className={`${barlowMedium.className}`}>{plan}</h4>

                    <p className={`${barlowSmall.className} text-fadegrey`}>27/1/2023</p>

                    <div className='flex items-center gap-4'>

                        <button className='button-secondary border rounded py-2 border-red'>Request a Quote</button>

                        <MdDeleteOutline size={25} className='cursor-pointer text-red'/>

                    </div>

                </div>

            ))

        }

    </div>

  )

}




export default Shared