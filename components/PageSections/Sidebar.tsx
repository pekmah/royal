'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Barlow } from 'next/font/google';
import { MdOutlineFileUpload } from 'react-icons/md';
import MultiRangeSlider from '../MultiRangeSlider';
import { Transition } from '@headlessui/react';
import { useQuery } from 'react-query';
import getAllProductCategories from '@/services/ProductCategory/getAllProductCategories';
import Image from 'next/image';
import { ProductCategoryEntity } from '@/types/product_category/ProductCategory';

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
	const { data, isLoading } = useQuery(['categories'], () =>
		getAllProductCategories()
	);

	const path = usePathname();
	const { push } = useRouter();

	return path.startsWith('/auth') ? null : (
		<Transition
			show={isOpen}
			{...transitionClasses}
			className={'w-[20%] h-fit'}>
			<aside className='w-[100%] h-fit'>
				<div className={`rounded-md shadow-lg ${barlow.className} bg-white `}>
					<div className='p-4'>
						<h3 className={barlowSemi.className}>Categories</h3>
					</div>
					<hr className='text-gray w-full mb-4' />
					<div className='text-sm w-full mb-4'>
						{isLoading && !data
							? Array(8)
									.fill(0)
									.map((v, idx) => (
										<div
											key={idx}
											className={'w-full my-4 h-6 bg-gray animate-pulse'}
										/>
									))
							: null}
						{data && data.results ? (
							[
								{ id: -1, name: 'All' } as ProductCategoryEntity,
								...data.results,
							].map(({ id, name, thumbnail }) => (
								<button
									onClick={() => push(`/products?category=${id}`)}
									className={
										'w-full justify-start flex items-center gap-2 px-4 py-2 hover:bg-gray hover:text-blue'
									}
									key={id}>
									{thumbnail ? (
										<span>
											<Image
												src={thumbnail}
												width={24}
												height={24}
												alt={`Thumbnail for ${name} category.`}
											/>
										</span>
									) : null}
									{name}
								</button>
							))
						) : !isLoading && !data ? (
							<p className='text-sm'>Failed to load categories</p>
						) : null}
					</div>
					<hr className='text-gray w-full mb-4' />
					<div className='flex justify-between px-6'>
						<h3 className={barlowSemi.className}>Price</h3>
						<button className='text-red text-sm'>Apply</button>
					</div>
					<MultiRangeSlider
						min={0}
						max={1000}
						onChange={({ min, max }: { min: number; max: number }) =>
							console.log(`min = ${min}, max = ${max}`)
						}
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
