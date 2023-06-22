'use client';

import { Barlow } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const barlow = Barlow({
	style: 'normal',
	weight: '400',
	subsets: ['latin'],
});

const navItems = [
	{
		path: '/',
		name: 'Home',
	},
	{ path: '/shop', name: 'Shop' },
	{ path: '/products', name: 'Products' },
	{ path: '/about', name: 'About Us' },
	{ path: '/faqs', name: 'FAQs' },
	{ path: '/contact', name: 'Contact Us' },
];

export default function NavMenu() {
	const pathname = usePathname();
	return (
		<nav className='w-full bg-[#FBF8F8] py-2 px-8 flex gap-8'>
			{navItems.map(({ name, path }) => (
				<Link
					href={path}
					key={path}
					className={`${pathname === path ? 'text-red' : 'text-fadegray'} ${
						barlow.className
					}`}>
					{name}
				</Link>
			))}
		</nav>
	);
}
