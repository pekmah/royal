'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { RxPerson } from 'react-icons/rx';
import { BsCart2 } from 'react-icons/bs';
import { CgMenuLeft } from 'react-icons/cg';
import SearchInput from './SearchInput';
import Image from 'next/image';
import DropdownMenu, { DropdownMenuItem } from './Dropdown';
import { usePathname } from 'next/navigation';
import NavMenu from './NavMenu';

export default function Header() {
	const { status, data } = useSession();
	const path = usePathname();

	return path.startsWith('/auth') ? null : (
		<>
			<div className='w-full h-[70px] relative object-contain'>
				<Image alt={'Offers Banner'} src={'/banner.png'} fill />
			</div>
			<NavMenu />
			<div className='w-full py-4 px-8 flex justify-between items-center bg-white shadow-sm'>
				<div className={`flex gap-8 items-center`}>
					<CgMenuLeft size={'24'} />
					<Image
						src={'/logo.png'}
						alt='Royal Mabati Logo'
						height={30}
						width={120}
					/>
				</div>
				<div className='w-[50%] flex'>
					<SearchInput />
				</div>
				<div className={`flex gap-4 items-center`}>
					{status === 'unauthenticated' ? (
						<div>
							<Link href={'/auth/login'}>Login</Link>
						</div>
					) : null}
					{status === 'loading' ? (
						<button
							className={
								'bg-gray button-secondary py-1 px-4 h-[24px] w-[px] skeleton-animation'
							}></button>
					) : status === 'authenticated' ? (
						<div className='flex items-center gap-4'>
							<BsCart2 size={'24'} />
							<DropdownMenu
								buttonText={
									<>
										<RxPerson size={'24'} />
									</>
								}>
								<DropdownMenuItem onClick={() => signOut()}>
									Logout
								</DropdownMenuItem>
							</DropdownMenu>
						</div>
					) : null}
				</div>
			</div>
		</>
	);
}
