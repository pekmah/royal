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
import { useRouter } from 'next/navigation';
import { ProductCardSkeleton } from '@/components/Product/ProductCard';

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
const barlowNormal = Barlow({
	style: 'normal',
	weight: '400',
	subsets: ['latin'],
});


const Account = () => {
  // const {data} = useQuery(['user_details'], ()=> getUserDetails())
  const router = useRouter()
  const {getUser} = useAuth()
  const [data, setData] = useState<UserEntity | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const {data:session, status} = useSession()
    const accessToken = session?.user

    // if (status === 'unauthenticated'){
    //   router.push('/')
    // }
    // console.log(accessToken)
  useEffect(() =>{
    setIsLoading(true)
    const fetchUser = async () => {
     
      if (accessToken){
        const userData =  await getUser()
        setData(userData)
      }
    }
    setIsLoading(false)
      fetchUser()
    },[accessToken])

  return (
      <div className=''>
        <div className='flex justify-between w-full'>
            <h3 className={`${barlowSemi.className} p-4 `}>Personal Details</h3>
            <Link href={'/account/edit'} className='flex gap-2 md:gap-4 text-red items-center'>
            <BiSolidEditAlt className='' size={25}/>
              <span className='text-sm md:text-base'>Edit</span>
            </Link>
        </div>
        <hr className="text-grey w-full mb-4" />
      {
        isLoading ? <ProductCardSkeleton/> : (
        <div className={` py-2 px-6`}>

              <div  className='flex flex-col py-4 text-sm'>
                <h4 className={`${barlowMedium.className} `}>Name</h4>
                <div className=' text-lightgrey'>
                  <span>{data?.first_name}</span>
                  <span className='px-2'>{data?.last_name}</span>
                </div>
              </div>
              <div  className='flex flex-col py-4 gap-2 text-sm'>
                <h4 className={`${barlowSemi.className} `}>Email</h4>
                <p className='text-lightgrey'>{data?.email}</p>
              </div>
              <div  className='flex flex-col py-4 gap-2 text-sm'>
                <h4 className={`${barlowSemi.className} `}>Phone Number</h4>
                <p className='text-lightgrey'>{data?.phone_number}</p>
              </div>
        </div>

        )
      }
        <div className="">
          <h3 className={`${barlowSemi.className} p-4 `}>Privacy & Security</h3>
          <hr className="text-grey w-full mb-4" />
          <div className='flex justify-between w-full items-center pb-4'>
            <h3 className={`${barlowNormal.className} p-4 `}>Your Password</h3>
            <Link href={'/account/change-password'} className='border text-sm md:text-base border-red rounded-md  text-red bg-white px-4 max-w-max py-1.5'>
              Change Password
            </Link>
          </div>
        </div>
      </div>

  )
}

export default Account
