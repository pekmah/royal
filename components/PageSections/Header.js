'use client';

import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import {RxPerson} from 'react-icons/rx';
import {BsCart2} from 'react-icons/bs';
import {CgMenuLeft} from 'react-icons/cg';
import {IoMdClose} from 'react-icons/io';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import NavMenu from './NavMenu';
import DropdownMenu, {DropdownMenuItem} from '../Dropdown';
import SearchInput from '../SearchInput';
import {useContext} from 'react';
import {CContext} from "@/context/CartContext2.js";

// interface HeaderProps {
//     isSidebarOpen: boolean;
//     setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
// }

export default function Header({
                                   setIsSidebarOpen,
                                   isSidebarOpen,
                               }) {
    const {status, data} = useSession();
    const path = usePathname();
    const {cart} = useContext(CContext)
    return path.startsWith('/auth') ? null : (
        <header className='fixed w-screen md:relative z-30'>
            {/* <div className='w-full h-[70px] relative'>
				<Image
					alt={'Offers Banner'}
					src={'/banner.png'}
					fill
					priority
					style={{ objectFit: 'cover', objectPosition: 'center' }}
				/>
			</div> */}
            <NavMenu/>
            <div
                className={`${path === '/about' ? 'hidden' : 'flex'} w-full py-4 px-8  justify-between items-center bg-blue shadow-sm`}>
                <div className={`flex gap-8 items-center`}>
                    <button
                        onClick={() => {
                            setIsSidebarOpen((prev) => !prev);
                        }}>
                        {isSidebarOpen ? (
                            <IoMdClose color='#fff' size={'24'}/>
                        ) : (
                            <CgMenuLeft color='#fff' size={'24'}/>
                        )}
                    </button>
                    <Image
                        src={'/logo-1.png'}
                        alt='Royal Mabati Logo'
                        height={35}
                        width={140}
                        style={{width: 'auto'}}
                    />
                </div>
                <div className='w-[50%] flex'>
                    <SearchInput/>
                </div>
                <div className={`flex gap-4 items-center`}>
                    {status === 'unauthenticated' ? (
                        <div>
                            <Link
                                href={'/auth/login'}
                                className='px-4 py-2 flex justify-center rounded-md bg-white text-black border-grey'>
                                Login
                            </Link>
                        </div>
                    ) : null}
                    {status === 'loading' ? (
                        <div
                            className={'bg-grey h-[38px] w-[74px] animate-pulse rounded-md'}
                        />
                    ) : status === 'authenticated' ? (
                        <div className='flex relative items-baseline gap-6 h-full'>
                            <Link href={'/cart'} className='flex items-center gap-4 font-medium'>
                                <div className=''>
                                    <BsCart2 size={'16'} color={'#fff'}/>
                                    <div
                                        className='absolute -top-3 text-sm left-3 opacity-100 bg-red w-6 flex items-center justify-center text-center h-6 text-white rounded-full px-1'>
                                        {cart?.length}
                                    </div>
                                </div>
                                <p className='text-sm text-white'>Cart</p>
                            </Link>
                            <DropdownMenu
                                buttonText={
                                    <Link href={'/account'} className='flex items-center gap-1 font-medium'>
                                        <RxPerson size={'16'} color={'#fff'}/>
                                        <p className='text-sm text-white'>Account</p>
                                    </Link>
                                }>
                                <DropdownMenuItem onClick={() => signOut()}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenu>
                        </div>
                    ) : null}
                </div>
            </div>
        </header>
    );
}
