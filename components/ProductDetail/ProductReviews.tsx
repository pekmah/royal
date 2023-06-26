import StarRating from './StarRating';
import { Barlow } from 'next/font/google';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

interface Props {
	reviews: any[] | null | undefined;
}

interface SingleReviewProps {
	name: string;
	rating: number;
	comment: string;
	date: string;
}

function getAbbreviation(name: string) {
	const words = name.split(' ');

	if (words.length === 1) {
		// If only one word, return the capitalized first letter
		return words[0].charAt(0).toUpperCase();
	} else {
		// If multiple words, combine the capitalized first letter of each word
		const abbreviation = words.reduce((abbr: string, word: string) => {
			return abbr + word.charAt(0).toUpperCase();
		}, '');
		return abbreviation;
	}
}

const SingleReview = ({ name, rating, comment, date }: SingleReviewProps) => {
	return (
		<div className='px-4 border-b border-gray mb-4'>
			<div className='flex items-center gap-2'>
				<div className='flex justify-center font-semibold items-center bg-gray rounded-full p-4'>
					{getAbbreviation(name)}
				</div>
				<div className='flex-col text-sm justify-between'>
					<p className='flex items-center'>
						<span className='font-semibold'>{name}</span>
						<span className='mx-4 rounded-full bg-fadegray p-1' />
						<span className='text-red text-[12px]'>Verified Purchase</span>
					</p>
					<p className='text-[12px]'>{date}</p>
				</div>
			</div>
			<div className='py-4'>
				<StarRating rating={rating} />
				<p className='text-sm py-4'>{comment}</p>
			</div>
		</div>
	);
};

export default function ProductReviews({ reviews }: Props) {
	return (
		<div className='bg-white rounded-md shadow-lg w-[50%]'>
			<div className='flex justify-between w-full p-4 items-center'>
				<h3 className={`${barlowSemi.className}`}>Customer Reviews</h3>
				{reviews && reviews.length > 0 ? (
					<p className='font-medium text-sm underline text-red'>
						See all ({reviews.length})
					</p>
				) : null}
			</div>
			<hr className='text-gray w-full mb-4' />
			<div className='max-h-[500px] overflow-y-auto'>
				{reviews && reviews.length > 0 ? (
					reviews.map((value, idx) => (
						<SingleReview {...value} key={`${value.id}~${idx}`} />
					))
				) : (
					<div className='px-4 border-b border-gray pb-4'>
						<p className='text-sm'>
							There are no reviews for this product yet.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
