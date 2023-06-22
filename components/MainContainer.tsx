'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
	const path = usePathname();
	return path.startsWith('/auth') ? (
		<section className='w-full'>{children}</section>
	) : (
		<section className='w-[80%]'>{children}</section>
	);
}
