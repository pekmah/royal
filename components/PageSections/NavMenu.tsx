import { Barlow } from 'next/font/google';
import {BsFacebook, BsLinkedin, BsInstagram} from 'react-icons/bs'
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

const navSocials = [
	{path:'https://facebook.com', icon:<BsFacebook size={15} />},
	{path:'/instagram', icon:<BsInstagram size={15} />},
	{path:'/linkedin', icon:<BsLinkedin size={15} />},
]

export default function NavMenu() {
	return (
		<nav
			className={`w-full bg-red py-2 px-8 flex text-sm justify-between text-white ${barlow.className}`}>
			<div className='flex gap-4'>
				{navItems.map(({ name, path }) => (
					<Link href={path} key={path} className={``}>
						{name}
					</Link>
				))}
			</div>
			<div className='flex divide-x-2 items-center gap-2'>
			<p>Contact Us: +254 703 567 890</p>
			<div className='flex gap-4 px-4 items-center'>
				{navSocials.map(({ path, icon})=> (
					<a href={path} key={path} target='_blank' rel="noopener noreferrer">
						{icon}
					</a>
				))}
			</div>

			</div>
		</nav>
	);
}
