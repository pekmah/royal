import AccountNav from '@/components/AccountNav';



export const metadata = {
	title: 'Account Details',
	description: 'Ecommerce Platform for Royal Mabati',
};

export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex gap-8'>
            <AccountNav/>
            <div>
            {children}

            </div>
        </div>
	);
}
