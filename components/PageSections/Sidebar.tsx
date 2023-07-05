'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Barlow } from 'next/font/google';
import { MdOutlineFileUpload } from 'react-icons/md';
import MultiRangeSlider from '../MultiRangeSlider';
import { Transition } from '@headlessui/react';
import CategoriesSidebar from '../ProductCategory/CategoriesSidebar';

const barlow = Barlow({
	style: 'normal',
	weight: '400',
	subsets: ['latin'],
});

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

interface SidebarProps {
	isOpen: boolean;
}

const transitionClasses = {
	enter: 'ease-out duration-350',
	enterFrom: 'opacity-0 scale-95',
	enterTo: 'opacity-100 scale-100',
	leave: 'ease-in duration-350',
	leaveFrom: 'opacity-100 scale-100',
	leaveTo: 'opacity-0 scale-95',
};

export default function Sidebar({ isOpen }: SidebarProps) {
	const path = usePathname();
	const { push } = useRouter();

	return path.startsWith('/auth') ? null : (
		<Transition
			show={isOpen}
			{...transitionClasses}
			className={`h-fit w-screen mt-32 md:mt-0 md:w-[20%]`}>
			<aside className='w-[100%] h-fit'>
				<div className={`rounded-md shadow-lg ${barlow.className} bg-white `}>
					<div className='p-4'>
						<h3 className={barlowSemi.className}>Categories</h3>
					</div>
					<hr className='text-gray w-full mb-4' />
					<CategoriesSidebar />
					<hr className='text-gray w-full mb-4' />
					<MultiRangeSlider
						name={'Price'}
						min={0}
						max={999999}
						onChange={({ min, max }: { min: number; max: number }) => {
							push(`/products?minPrice=${min}&maxPrice=${max}`);
						}}
					/>
				</div>
				<div
					className={`rounded-md shadow-lg ${barlow.className} text-sm pb-8 mt-4 bg-white `}>
					<h3 className={`p-4 text-base ${barlowSemi.className}`}>
						Upload Plan
					</h3>
					<hr className='text-gray w-full mb-4' />
					<p className='px-4'>
						Get a personalized quote created just for your house simply by
						uploading the house’s plan
					</p>
					<div className='px-4'>
						<button
							className={`button-primary w-full mt-4 rounded-lg text-sm flex items-center justify-center gap-4 ${barlowSemi.className}`}>
							<MdOutlineFileUpload size={16} className='text-white' />
							<span>Upload Plan</span>
						</button>
					</div>
				</div>
			</aside>
		</Transition>
	);
}
