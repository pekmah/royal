"use client"
import { Barlow } from 'next/font/google';
import Link from 'next/link';
import {BiSolidEditAlt} from 'react-icons/bi'

const details = [
  {label:'Name', detail:"Evanrobby"},
  {label:"Email", detail:"evansitoden94@gmail.com"},
  {label:'Phone Number', detail:"+254 704563123"}
]
const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});
const barlowNormal = Barlow({
	style: 'normal',
	weight: '400',
	subsets: ['latin'],
});


const account = () => {
  return (
      <div className='flex flex-col min-w-[50vw] flex-grow h-[75vh] bg-white shadow-md rounded-md max-w-full px-4'>
        <div className='flex justify-between w-full'>
            <h3 className={`${barlowSemi.className} p-4 `}>Personal Details</h3>
            <Link href={'/account/edit'} className='flex gap-4 text-red items-center'>
            <BiSolidEditAlt size={25}/>
              <span>Edit</span>
            </Link>
        </div>
        <hr className="text-gray w-full mb-4" />

        <div className={`${barlowNormal.className} py-2 px-6`}>
          {details.map(({label, detail})=>(
              <div key={label} className='flex flex-col py-4 gap-2 text-sm'>
                <h4 className='text-lightgray'>{label}:</h4>
                <p>{detail}</p>
              </div>
          ))}
        </div>
        <div className="">
          <h3 className={`${barlowSemi.className} p-4 `}>Privacy & Security</h3>
          <hr className="text-gray w-full mb-4" />
          <div className='flex justify-between w-full items-center pb-4'>
            <h3 className={`${barlowNormal.className} p-4 `}>Your Password</h3>
            <Link href={'/account/change-password'} className='border border-red rounded-md  text-red bg-white px-4 max-w-max py-1.5'>
              Change Password
            </Link>
          </div>
        </div>
      </div>
   
  )
}

export default account