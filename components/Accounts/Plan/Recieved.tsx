import Image from 'next/image'
import pdf from '@/public/pdf.png'
import React, { useState } from 'react'
import { RequestProps } from './RecievedQuotes'
import { Barlow } from 'next/font/google'
import Link from 'next/link'
import ReceivedDetail from './ReceivedDetail'

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

const Recieved: React.FC<sharedProps> = ({ requests }) => {
    const [isOpen, setIsOpen] = useState(false)
    // console.log(requests)
    return (
        <div className='grid relative grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'>
            {
                requests.map(({ id, quote_file_code, quote_file_name,  roof_plan_file_name, created_at }) => {
                    const dateObject = new Date(created_at!);
                    const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
                    return (

                        <div key={id} className='flex relative flex-col gap-4'>

                            <div onClick={()=>setIsOpen(true)} className='relative rounded-2xl cursor-pointer overflow-hidden w-[15.625rem] h-[10rem]'>

                                <Image src={pdf} alt='/'

                                    fill priority

                                />

                            </div>

                            <h4 className={`${barlowMedium.className}`}>{roof_plan_file_name}</h4>
                            {isOpen && <ReceivedDetail name={quote_file_name} close={setIsOpen} />}

                            <p className={`${barlowSmall.className} text-fadegrey`}>{formattedDate}</p>
                        </div>

                    )
                })

            }

        </div>

    )

}




export default Recieved