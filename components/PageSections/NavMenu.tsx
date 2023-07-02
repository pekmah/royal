import { Barlow } from 'next/font/google';
import Link from 'next/link';

const barlow = Barlow({
	style: 'normal',
	weight: '500',
	subsets: ['latin'],
});

const navItems = [
	{ path: '/shop', name: 'Shop' },
	{ path: '/about', name: 'About Us' },
];

export default function NavMenu() {
	return (
		<nav
			className={`w-full bg-red py-2 px-8 flex justify-between text-white ${barlow.className}`}>
			<div className='flex gap-4'>
				{navItems.map(({ name, path }) => (
					<Link href={path} key={path} className={``}>
						{name}
					</Link>
				))}
			</div>
			<p>Contact Us: +254 703 567 890</p>
		</nav>
	);
}
