"use client"
import getCarouselImages from '@/services/Carousel/getCarouselImages';
import { Barlow } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState, useRef} from 'react'
import { useQuery } from 'react-query';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

const barlow = Barlow({
	style: 'normal',
	weight: '400',
	subsets: ['latin'],
});

export default function LandingPageBanner() {
	const [page, _setPage] = useState<number>(1);
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	 const { data, isLoading, error } = useQuery(
      ['carouselImages'],
      () => getCarouselImages(page),
    );
	const nextSlide = () => {
		setCurrentSlide((prevSlide) => (prevSlide + 1) % (data?.results?.length ?? 0));
	  };
	useEffect(() => {
		if(data){
		  // Start the automatic sliding after 3 seconds
		  timerRef.current = setInterval(nextSlide, 3000);
	
		  return () => {
			// Clear the interval when the component unmounts
			if (timerRef.current) {
			  clearInterval(timerRef.current);
			}
		}
		  };
	  }, [data]);
// console.log(currentSlide)
	return (
		<div className={'w-full relative h-max block md:flex shadow-lg rounded-md'}>

		<div className='justify-center rounded-md  min-w-full h-[229px] bg-grey'>
		{data && data.results && data.results?.length > 0 && data.results.map(({ id, image_code }, index) => (
			<div
			  key={id}
			  className={`relative h-[229px] min-w-[340px] ${
				index === currentSlide ? '' : 'hidden'
			  }`}>
			  <Image
				alt={'Landing page Banner'}
				src={
					image_code
						? `${process.env.BASE_URL}/api/v1/core/carousel/${image_code}`
						: "/landing-banner-2.png"
				}
				fill
				priority
				style={{ objectFit: 'cover', objectPosition: 'center' }}
			  />
			</div>
		  ))}
		  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {data && data.results && data.results?.length > 0 ? data.results.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-blue' : 'bg-[#D9D9D9]'
              }`}
            />
          )): null}
		  </div>
       
		  
			<div
			className='absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 z-10 opacity-100'
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					paddingLeft: '8px',
					paddingRight: '8px',
				}}> 
				 <h2 className={`${barlowSemi.className} text-[32px] py-2`}>
					<span className='text-black'>Get your</span>
					<span className='text-blue'> Royal Mabati</span>
				</h2>
				<p className={`${barlow.className} text-[12px] max-w-xl mx-auto text-center py-2 px-2`}>
					When it comes to roofing, Royal Mabati ® has the experience & know how
					to make it both durable and beautiful. Roman longtile, Box, Bricktile,
					Corrugated, Eurotile Profile and Commercial IT 5 Available
				</p>
				<div className='py-2'>
					<Link
						className='button-primary py-[6px] px-[14px] text-[12px]'
						href={'/products'}>
						Buy Now
					</Link>
				</div>
			</div>
			</div>
		</div>
	);
}