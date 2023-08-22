"use client"
// import getUserDetails from '@/services/User/getUserDetaill';
import { useSession } from 'next-auth/react';
import { Barlow } from 'next/font/google';
import Link from 'next/link';
import {BiSolidEditAlt} from 'react-icons/bi'
import { useQuery } from 'react-query';
import {useEffect, useState} from 'react'

const details = [
  {label:'Name', detail:"John Doe"},
  {label:"Email", detail:"ericpekmah@gmail.com"},
  {label:'Phone Number', detail:"+254 700 000 000"}
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
  // const {data} = useQuery(['user_details'], ()=> getUserDetails())
  // const [data, setData] = useState([])
  // const {data:session} = useSession()
  //   const accessToken = session?.user
  //   // console.log(accessToken)
  // useEffect(() =>{
  //   const fetchUser = async () => {
  //     try{
  //     const res = await fetch(
  //       `/api/user/details`, {
  //           headers:{ 
  //               Authorization :`Bearer ${accessToken}`
  //             }
  //         }
  //     );
  //     console.log(res)
  //     if (!res.ok) {
  //         throw new Error('Failed to fetch User Details');
  //     }

  //     console.log(res.json());
  // } catch (error) {
  //     console.error('Error fetching user Details:', error);
  //     throw error; // Rethrow the error to be caught by the query
  // }
  //     }
  //     fetchUser()
  //   },[])
  // console.log(data)
  return (
      <div className=''>
        <div className='flex justify-between w-full'>
            <h3 className={`${barlowSemi.className} p-4 `}>Personal Details</h3>
            <Link href={'/account/edit'} className='flex gap-4 text-red items-center'>
            <BiSolidEditAlt size={25}/>
              <span>Edit</span>
            </Link>
        </div>
        <hr className="text-grey w-full mb-4" />

        <div className={`${barlowNormal.className} py-2 px-6`}>
          {details.map(({label, detail})=>(
              <div key={label} className='flex flex-col py-4 gap-2 text-sm'>
                <h4 className='text-lightgrey'>{label}:</h4>
                <p>{detail}</p>
              </div>
          ))}
        </div>
        <div className="">
          <h3 className={`${barlowSemi.className} p-4 `}>Privacy & Security</h3>
          <hr className="text-grey w-full mb-4" />
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
