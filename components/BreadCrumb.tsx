'use client';

import { capitalizeFirstLetter } from '@/utils/helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai';

const Breadcrumb = ({ replacePath }: { replacePath?: string }) => {
	const pathname = usePathname();
	const paths = pathname.split('/').filter((p) => p !== '');

	return (
		<nav className='text-sm font-medium' aria-label='Breadcrumb'>
			<ol className='list-none flex items-center h-full'>
				<li className='flex items-center h-full'>
					<Link href='/'>
						<AiFillHome />
					</Link>
				</li>
				{paths.map((path, idx) => (
					<li className='flex items-center h-full' key={path}>
						<span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
						<Link
							href={`${idx !== 0 ? `/${paths[idx - 1]}` : ''}/${path}`}
							className={`${
								idx === paths.length - 1 ? 'text-blue underline' : ''
							}`}>
							{replacePath && idx === paths.length - 1
								? replacePath
								: capitalizeFirstLetter(path)}
						</Link>
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
