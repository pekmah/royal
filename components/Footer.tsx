'use client';

import { Barlow } from 'next/font/google';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const barlow = Barlow({
	style: 'normal',
	weight: '400',
	subsets: ['latin'],
});

export default function Footer() {
	const path = usePathname();
	return path.startsWith('/auth') ? (
		<footer className='w-full flex justify-center bottom-0 pb-8'>
			<div className='text-center text-[10pt] text-fadegray'>
				<p>Copyright © 2023 Royal Mabati</p>
				<p>Factory LTD Reserved</p>
			</div>
		</footer>
	) : (
		<footer
			className={`bottom-0 bg-blue ${barlow.className} w-full p-8  text-white`}>
			<div className={` flex justify-evenly`}>
				<div>
					<h3 className={`text-[14px] font-semibold`}>CONTACT US</h3>

					<div className={`flex-col mt-6`}>
						<h5 className={`text-[14px] font-semibold`}>Location</h5>
						<p className={`text-[12px] mt-3 font-medium`}>
							Nairobi along Mombasa Rd, Mlolongo, Opp Sabaki Stage
						</p>
					</div>

					<div className={`flex-col mt-6`}>
						<h5 className={`text-[14px] font-semibold`}>Telephone:</h5>
						<p className={`text-[12px] mt-3 font-medium`}>0722 638 383</p>
					</div>

					<div className={`flex-col mt-6`}>
						<h5 className={`text-[14px] font-semibold`}>Email:</h5>
						<p className={`text-[12px] mt-3 font-medium`}>
							info@royalmabati.com
						</p>
					</div>

					<div className={`flex-col mt-6`}>
						<h5 className={`text-[14px] font-semibold`}>Mail:</h5>
						<p className={`text-[12px] mt-3 font-medium`}>
							P.O. Box 29721 - 00202
						</p>
					</div>
				</div>
				<div>
					<h3 className={`text-[14px] font-semibold`}>ABOUT US</h3>

					<div className={`flex-col mt-6`}>
						<p className={`text-[12px] mt-3 font-medium`}>Terms & Contitions</p>
					</div>

					<div className={`flex-col mt-6`}>
						<p className={`text-[12px] mt-3 font-medium`}>Privacy Policy</p>
					</div>

					<div className={`flex-col mt-6`}>
						<p className={`text-[12px] mt-3 font-medium`}>
							Return and Refund Policy
						</p>
					</div>

					<div className={`flex-col mt-6`}>
						<p className={`text-[12px] mt-3 font-medium`}>Shipping</p>
					</div>

					<div className={`flex-col mt-6`}>
						<p className={`text-[12px] mt-3 font-medium`}>FAQs</p>
					</div>

					<div className={`flex-col mt-6`}>
						<p className={`text-[12px] mt-3 font-medium`}>Careers</p>
					</div>
				</div>
				<div>
					<h3 className={`text-[14px] font-semibold`}>
						DOWNLOAD THE ROYAL MABATI APP FOR FREE
					</h3>

					<div className={`flex-col mt-6`}>
						<Image
							src={'/playstore.png'}
							priority
							width={135}
							height={40}
							alt='Playstore icon link'
						/>
					</div>

					<div className={`flex-col mt-6`}>
						<h5 className={`text-[14px] font-semibold`}>CONNECT WITH US</h5>
						<div className={`mt-6`}>
							<div className='flex gap-4'>
								<Image
									src={'/facebook.png'}
									priority
									width={20}
									height={20}
									alt='Playstore icon link'
								/>
								<p className='text-sm'>Facebook</p>
							</div>
							<div className='flex gap-4 mt-3'>
								<Image
									src={'/instagram.png'}
									priority
									width={20}
									height={20}
									alt='Playstore icon link'
								/>
								<p className='text-sm'>Instagram</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='text-center text-[12px] border-t mt-8 pt-8'>
				<p>Copyright © 2023 Royal Mabati Factory LTD Reserved</p>
				<div className='text-[12px]'>
					<span>Designed & Built by</span>
					<span className='underline text-red'> Glitex Solutions</span>
				</div>
			</div>
		</footer>
	);
}
