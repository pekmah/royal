import { FC } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

interface StarRatingProps {
	totalStars: number;
	rating: number;
	reviewCount: number;
}

const StarRating: FC<StarRatingProps> = ({
	totalStars,
	rating,
	reviewCount,
}) => {
	return (
		<div className={`flex gap-2 items-center`}>
			{[...Array(totalStars)].map((_, index) => (
				<div key={index} className={``}>
					{index >= rating ? (
						<BsStar />
					) : (
						<BsStarFill className={`text-[#FFC806]`} />
					)}
				</div>
			))}
			<p className='text-sm ml-8 text-fadegray'>{`(${reviewCount} reviews)`}</p>
		</div>
	);
};

export default StarRating;
