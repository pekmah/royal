'use client';

import { FormProps } from '@/components/Form/types/form.types';
import MultiStepForm from '@/components/MultiStepForm';
import parseServerErrors from '@/utils/parseServerErrors';
import { Barlow } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { toast } from 'react-hot-toast';

const barlow = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});

const emailFormProps: FormProps = {
	fields: {
		email: {
			type: 'text',
			htmlType: 'email',
			label: 'Enter your email',
			placeholder: 'Email',
		},
	},
	onSubmit: async (data: any) => {
		if (!data.email) {
			throw new Error('Email is required');
		}
	},
	formTitle: 'Verify your account',
	Container: ({ children }: { children: ReactNode }) => (
		<section className='min-h-full flex w-full'>
			<div
				className='w-full py-12 px-8 bg-white flex justify-center'
				style={{
					boxShadow: '0px 4px 15px 1px rgba(0, 0, 0, 0.1)',
					borderRadius: '0 4px 4px 0',
				}}>
				{children}
			</div>
		</section>
	),
	styling: {
		formWidth: 'w-[50%]',
	},
};

const codeFormProps: FormProps = {
	fields: {
		otp: {
			type: 'pin',
			label: '',
			placeholder: 'Code',
			helperText: 'Enter the 6 digit code sent to your number.',
		},
	},
	onSubmit: (data: any) => {
		if (!data.otp) {
			throw new Error('OTP is required');
		}
	},
	formTitle: 'Reset your password',
	Container: ({ children }: { children: ReactNode }) => (
		<section className='min-h-full flex w-full'>
			<div
				className='w-full py-12 px-8 bg-white flex justify-center'
				style={{
					boxShadow: '0px 4px 15px 1px rgba(0, 0, 0, 0.1)',
					borderRadius: '0 4px 4px 0',
				}}>
				{children}
			</div>
		</section>
	),
	styling: {
		formWidth: 'w-[50%]',
	},
	SubmitInfo: (
		<div className='pt-8'>
			Didn&apos;t get the code? <a className='text-red'>Resend code in 60</a>
		</div>
	),
};

export default function Verify() {
	const { push } = useRouter();
	return (
		<main className={`${barlow.className} py-20 px-16 min-h-screen`}>
			<MultiStepForm
				forms={[emailFormProps, codeFormProps]}
				submitHandler={async ({ data }) => {
					try {
						const res = await fetch('/api/auth/verify', {
							body: JSON.stringify(data),
							method: 'POST',
						});
						const resData = await res.json();

						if (resData.error) {
							throw new Error(resData.error);
						} else {
							toast.success(resData['message']);
							push('/auth/login');
						}
					} catch (e: any) {
						console.error('err', e.message);
						toast.error(e.message);
					}
				}}
			/>
		</main>
	);
}
