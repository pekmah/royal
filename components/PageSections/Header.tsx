'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { RxPerson } from 'react-icons/rx';
import { BsCart2 } from 'react-icons/bs';
import { CgMenuLeft } from 'react-icons/cg';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NavMenu from './NavMenu';
import DropdownMenu, { DropdownMenuItem } from '../Dropdown';
import SearchInput from '../SearchInput';
import { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({
	setIsSidebarOpen,
	isSidebarOpen,
}: HeaderProps) {
	const { status, data } = useSession();
	const path = usePathname();

	return path.startsWith('/auth') ? null : (
		<header>
			{/* <div className='w-full h-[70px] relative'>
				<Image
					alt={'Offers Banner'}
					src={'/banner.png'}
					fill
					priority
					style={{ objectFit: 'cover', objectPosition: 'center' }}
				/>
			</div> */}
			<NavMenu />
			<div className='w-full py-4 px-8 flex justify-between items-center bg-blue shadow-sm'>
				<div className={`flex gap-8 items-center`}>
					<button
						onClick={() => {
							setIsSidebarOpen((prev) => !prev);
						}}>
						{isSidebarOpen ? (
							<IoMdClose color='#fff' size={'24'} />
						) : (
							<CgMenuLeft color='#fff' size={'24'} />
						)}
					</button>
					<Image
						src={'/logo-2.png'}
						alt='Royal Mabati Logo'
						height={35}
						width={140}
						style={{ width: 'auto' }}
					/>
				</div>
				<div className='w-[50%] flex'>
					<SearchInput />
				</div>
				<div className={`flex gap-4 items-center`}>
					{status === 'unauthenticated' ? (
						<div>
							<Link
								href={'/auth/login'}
								className='px-4 py-2 flex justify-center rounded-md bg-white text-black border-gray'>
								Login
							</Link>
						</div>
					) : null}
					{status === 'loading' ? (
						<div
							className={'bg-gray h-[38px] w-[74px] animate-pulse rounded-md'}
						/>
					) : status === 'authenticated' ? (
						<div className='flex items-baseline gap-6 h-full'>
							<div className='flex items-center gap-1 font-medium'>
								<BsCart2 size={'16'} color={'#fff'} />
								<p className='text-sm text-white'>Cart</p>
							</div>
							<DropdownMenu
								buttonText={
									<div className='flex items-center gap-1 font-medium'>
										<RxPerson size={'16'} color={'#fff'} />
										<p className='text-sm text-white'>Account</p>
									</div>
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
