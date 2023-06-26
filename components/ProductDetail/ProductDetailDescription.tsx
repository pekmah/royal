import { Barlow } from "next/font/google";

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});


export default function ProductDetailDescription() {
	return (
		<div className='bg-white rounded-md shadow-lg w-[50%]'>
			<h3 className={`${barlowSemi.className} p-4`}>Product Details</h3>
			<hr className='text-gray w-full mb-4' />
			<div className='px-4 text-sm'>
				<p className='mb-4'>
					Zee tiles matte triple refined vegetable oil made from pure vegetable
					oil. It is cholesterol free that is great for your whole cookery
					requirements. For a happy, healthy living. fortified with vitamins A &
					D, good for your vision.
				</p>
				<h5 className='mb-4 font-semibold'>Details</h5>
				<ul className='mb-4 list-disc px-8'>
					<li>Triple refined vegetable</li>
					<li>Made from pure vegetable</li>
					<li>It is cholesterol free</li>
					<li>Your whole cookery requirements</li>
					<li>For a happy, healthy living</li>
				</ul>
				<h5 className='mb-4 font-semibold'>Our Guarantee</h5>
				<ul className='mb-4 list-disc px-8'>
					<li>Triple refined vegetable</li>
					<li>Made from pure vegetable</li>
					<li>It is cholesterol free</li>
					<li>Your whole cookery requirements</li>
					<li>For a happy, healthy living</li>
				</ul>
			</div>
		</div>
	);
}
