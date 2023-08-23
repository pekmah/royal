"use client"
// import getUserDetails from '@/services/User/getUserDetaill';
import { useSession } from 'next-auth/react';
import { Barlow } from 'next/font/google';
import Link from 'next/link';
import {BiSolidEditAlt} from 'react-icons/bi'
import { useQuery } from 'react-query';
import {useEffect, useState} from 'react'
import useAuth from '@/hooks/useAuth';
import { UserEntity } from '@/types/user/User';

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
  const {getUser} = useAuth()
  const [data, setData] = useState<UserEntity | null>(null)
  
  const {data:session} = useSession()
    const accessToken = session?.user
    // console.log(accessToken)
  useEffect(() =>{
    const fetchUser = async () => {
      if (accessToken){
        const userData =  await getUser()
        setData(userData)
      }
    }
      fetchUser()
    },[accessToken])
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

              <div  className='flex flex-col py-4 gap-2 text-sm'>
                <h4 className='text-lightgrey'>Name</h4>
                <div>
                  <span>{data?.first_name}</span>
                  <span className='px-2'>{data?.last_name}</span>
                </div>
              </div>
              <div  className='flex flex-col py-4 gap-2 text-sm'>
                <h4 className='text-lightgrey'>Email</h4>
                <p>{data?.email}</p>
              </div>
              <div  className='flex flex-col py-4 gap-2 text-sm'>
                <h4 className='text-lightgrey'>Phone Number</h4>
                <p>{data?.phone_number}</p>
              </div>
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
