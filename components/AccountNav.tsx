"use client"
import Link from 'next/link'
import React from 'react'
import {BsPerson, BsBagCheck, BsFileEarmarkText, BsHeart, BsCreditCard} from 'react-icons/bs'
import {IoChatbubblesOutline, IoLogOutOutline} from 'react-icons/io5'
import { Barlow } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react"


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

const iconSize = 20
const accountLinks = [
    {path:'/account', icon: <BsPerson size={iconSize}/>, name:'Profile Information'},
    {path:'/orders', icon: <BsBagCheck size={iconSize}/>, name:'Orders'},
    {path:'/plans', icon: <BsFileEarmarkText size={iconSize}/> ,name:"My plans"},
    {path:'/favorite', icon: <BsHeart size={iconSize}/>, name:'Favorite'},
    {path:'/installments', icon: <BsCreditCard size={iconSize}/>, name:"Installments"},
    {path:'/reviews', icon: <IoChatbubblesOutline size={iconSize}/>, name: "My reviews"},
  ]
const AccountNav = () => {
    const pathname = usePathname()
    const inactive = "flex items-center gap-4 py-2 px-4 hover:bg-gray";
    const active = `${inactive} bg-gray w-full  rounded-l-xl`;
  return (
    <aside className='flex relative h-[75vh] w-full bg-white shadow-md min-w-[20vw] max-w-[25vh]  rounded-md'>
    <div>
      <h2 className={`${barlowSemi.className} p-4 `}>My account</h2>
      <hr className="text-gray w-full mb-4" />
      {
        accountLinks.map(({path, name, icon})=>(
          <Link key={path} href={path} className={'flex items-center gap-4 p-4 hover:bg-gray'}>
            <div className='text-blue'>{icon}</div>
            <span className={`${barlowNormal.className} text-lightgray`}>{name}</span>
          </Link>
        ))
      }
     <hr className="text-gray w-full mt-8" />
     <div className='absolute bottom-4  '>
         <button onClick={()=>signOut()} className='flex items-center gap-2 px-4'>
            <IoLogOutOutline size={iconSize} className='text-blue'/>
            <span>Logout</span>
         </button>
     </div>
    </div>
    </aside>
  )
}

export default AccountNav