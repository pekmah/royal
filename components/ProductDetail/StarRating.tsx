import { FC } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

interface StarRatingProps {
    rating: number;
    reviewCount?: number;
}

const StarRating: FC<StarRatingProps> = ({ rating, reviewCount }) => {
    return (
        <div className={`flex gap-2 items-center`}>
            {[...Array(5)].map((_, index) => (
                <div key={index} className={``}>
                    {index >= rating ? (
                        <BsStar />
                    ) : (
                        <BsStarFill className={`text-[#FFC806]`} />
                    )}
                </div>
            ))}
            {reviewCount ? (
                <p className="text-sm ml-8 text-fadegray">{`(${reviewCount} reviews)`}</p>
            ) : null}
        </div>
    );
};

export default StarRating;
