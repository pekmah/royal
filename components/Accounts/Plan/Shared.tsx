import Image, { StaticImageData } from 'next/image'
import pdf from '@/public/pdf.png'
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

const Shared: React.FC<sharedProps> = ({ requests }) => {
    // console.log(requests)
    return (
        <div className='grid grid-cols-3 gap-8'>
            {
                requests.map(({ id, image, roof_plan_file_name, created_at }) => {
                    const dateObject = new Date(created_at!);
                    const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
                    return (

                        <div key={id} className='flex flex-col gap-4'>

                            <div className='relative rounded-2xl overflow-hidden w-[15.625rem] h-[10rem]'>

                                <Image src={pdf} alt='/'

                                    fill priority

                                />

                            </div>

                            <h4 className={`${barlowMedium.className}`}>{roof_plan_file_name}</h4>

                            <p className={`${barlowSmall.className} text-fadegrey`}>{formattedDate}</p>

                            <div className='flex items-center gap-4'>

                                <button className='button-secondary border rounded py-2 border-red' style={{ whiteSpace: "nowrap" }}>Request a Quote</button>

                                <MdDeleteOutline size={25} className='cursor-pointer text-red' />

                            </div>

                        </div>

                    )
                })

            }

        </div>

    )

}




export default Shared