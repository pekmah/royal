import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Inter, Barlow } from 'next/font/google';
import Header from '@/components/Header';
import AuthProvider from '@/components/Provider';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { MdOutlineFileUpload } from 'react-icons/md';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Royal Mabati',
	description: 'Ecommerce Platform for Royal Mabati',
};

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<AuthProvider>
				<body className={`${inter.className}`} style={{ overflowX: 'hidden' }}>
					<Header />
					<div className={`w-screen p-8 flex gap-8 bg-[#fbfbff]`}>
						<div className='w-[20%] bg-white'>
							<Sidebar />
							<div
								className={`rounded-md shadow-lg ${barlow.className} text-sm pb-8 mt-4`}>
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
						</div>
						<div className='w-[80%] bg-white'>{children}</div>
					</div>
					<Footer />
					<Toaster position='bottom-right' reverseOrder={false} />
				</body>
			</AuthProvider>
		</html>
	);
}
