'use client';

import { ReactNode, useEffect, useState } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import Footer from './Footer';
import { useSearchContext } from '@/context/SearchContext';

export default function MainContainer({ children }: { children: ReactNode }) {
	
	const {isSidebarOpen, setIsSidebarOpen} = useSearchContext()
	const path = usePathname();
	const isMediumDevice = useMediaQuery('(max-width: 1024px)');

	useEffect(() => {
		if (isMediumDevice) setIsSidebarOpen(false);
	}, [isMediumDevice]);

	return (
		<>
			<Header
				setIsSidebarOpen={setIsSidebarOpen}
				isSidebarOpen={isSidebarOpen}
			/>
			
			<main className={`w-screen p-8 flex gap-8 bg-[#fbfbff]`}>
				<Sidebar isOpen={isSidebarOpen} />
				{!path.startsWith('/auth') && !path.startsWith('/about') && !path.startsWith('/account') ? (
					<section
						className={`${
							isSidebarOpen ? 'md:w-[80%] hidden md:block' : 'w-full' 
						} transition-all mt-32 md:mt-[0] duration-300`}>
						{children}
					</section>
				) : (
					<section className='w-full transition-all ease-in-out duration-300'>
						{children}
					</section>
				)}
			</main>
			{!isSidebarOpen ? <Footer /> : null}
		</>
	);
}
