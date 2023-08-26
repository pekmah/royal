import {useQuery} from "react-query";
import StarRating from "./StarRating";
import {Barlow} from "next/font/google";
import getProductReviews from "@/services/Product/getProductReviews";
import {useState} from "react";
import {ProductReview} from "@/types/product/Product";
import {formatDate} from "@/utils/dateFormatter";

const barlowSemi = Barlow({
    style: "normal",
    weight: "600",
    subsets: ["latin"],
});

interface Props {
    id: string;
}

function getAbbreviation(name: string) {
    const words = name.split(" ");

    if (words.length === 1) {
        // If only one word, return the capitalized first letter
        return words[0].charAt(0).toUpperCase();
    } else {
        // If multiple words, combine the capitalized first letter of each word
        const abbreviation = words.reduce((abbr: string, word: string) => {
            return abbr + word.charAt(0).toUpperCase();
        }, "");
        return abbreviation;
    }
}

const SingleReview = ({
                          user,
                          rating,
                          comments,
                          review_date,
                      }: ProductReview) => {
    return (
        <div className="px-4 border-b border-grey mb-4">
            <div className="flex items-center gap-2">
                <div className="flex justify-center font-semibold items-center bg-grey rounded-full p-4">
                    {getAbbreviation(user)}
                </div>
                <div className="flex-col text-sm justify-between">
                    <p className="flex items-center">
                        <span className="font-semibold">{user}</span>
                        {/* <span className="mx-4 rounded-full bg-fadegrey p-1" />
                        <span className="text-primary_red text-[12px]">
                            Verified Purchase
                        </span> */}
                    </p>
                    <p className="text-[12px]">{formatDate(review_date)}</p>
                </div>
            </div>
            <div className="py-4">
                <StarRating rating={rating}/>
                <p className="text-sm py-4">{comments}</p>
            </div>
        </div>
    );
};

export default function ProductReviews({id}: Props) {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(20);
    const [count, setCount] = useState(0);

    const {data} = useQuery(
        ["reviews", id],
        () => getProductReviews(pageSize, page, parseInt(id)),
        {
            keepPreviousData: true,
            onSuccess(data) {
                setCount(data.count);
            },
            onError(err) {
                console.error("err", err);
            },
        }
    );

    return (
        <div className="bg-white rounded-md shadow-lg w-full mt-4 md:mt-0 md:w-[50%]">
            <div className="flex justify-between w-full p-4 items-center">
                <h3 className={`${barlowSemi.className}`}>Customer Reviews</h3>
                {data && data.results && data.results.length > 0 ? (
                    <p className="font-medium text-sm underline text-primary_red">
                        See all ({data.count})
                    </p>
                ) : null}
            </div>
            <hr className="text-grey w-full mb-4"/>
            <div className="max-h-[500px] overflow-y-auto">
                {data && data.results && data.results.length > 0 ? (
                    data.results.map((value, idx) => (
                        <SingleReview {...value} key={`${value.id}~${idx}`}/>
                    ))
                ) : (
                    <div className="px-4 border-b border-grey pb-4">
                        <p className="text-sm">
                            There are no reviews for this product yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
