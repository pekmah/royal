'use client';

import { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

export default function MainContainer({ children }: { children: ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
				{!path.startsWith('/auth') ? (
					<section
						className={`${
							isSidebarOpen ? 'w-[80%]' : 'w-full'
						} transition-all duration-300`}>
						{children}
					</section>
				) : (
					<section className='w-full transition-all ease-in-out duration-300'>
						{children}
					</section>
				)}
			</main>
		</>
	);
}
