import { Barlow } from 'next/font/google';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

interface Props {
	description: string;
}

// Define an array of delimiters
const delimiters = ['\r\n', '\t'];

// Function to split the string using any of the delimiters
const splitString = (str: string, delimiters: Array<string>) => {
	let regexPattern = delimiters.join('|');
	return str.split(new RegExp(regexPattern));
};

export default function ProductDetailDescription({ description }: Props) {
	return (
		<div className='bg-white rounded-md shadow-lg w-[50%]'>
			<h3 className={`${barlowSemi.className} p-4`}>Description</h3>
			<hr className='text-gray w-full mb-4' />
			<div className='px-4 pb-4 text-sm'>
				{splitString(description, delimiters).map((line, index) => (
					<p key={index} className='pb-2'>
						{line}
					</p>
				))}
			</div>
		</div>
	);
}
