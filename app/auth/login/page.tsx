'use client';

import { FormProps } from '@/components/Form/types/form.types';
import MultiStepForm from '@/components/MultiStepForm';
import { signIn } from 'next-auth/react';
import { Barlow } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';

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
	onSubmit: (data: any) => {
		if (!data.email) {
			throw new Error('Email is required');
		}
	},
	formTitle: 'Sign in to your account',
	SubmitInfo: (
		<div className={`${barlow.className} text-grey my-8`}>
			<div>
				Signing up for a Royal Mabati account means that you agree to the{' '}
				<Link className='text-red' href={''}>
					Privacy Policy
				</Link>{' '}
				and{' '}
				<Link className='text-red' href={''}>
					Terms of Service
				</Link>
			</div>
			<div className='w-full flex justify-end mt-8'>
				<Link
					href={'/auth/password_reset'}
					className='text-blue underline font-[700]'>
					Forgot Password?
				</Link>
			</div>
		</div>
	),
	Container: ({ children }: { children: ReactNode }) => {
		return (
			<section className='min-h-full flex w-full'>
				<div
					className='w-full min-h-full flex-col justify-center items-center hidden md:hidden lg:flex xl:flex'
					style={{
						background:
							'linear-gradient(323.54deg, #DC2A25 10.19%, #FF3832 99.32%)',
						borderRadius: '0 4px 4px 0',
					}}>
					<div className='flex flex-col items-center gap-8'>
						<div>
							<h2
								className={`text-xl font-[700] ${barlow.className} text-white`}>
								Create an new account
							</h2>
						</div>
						<div>
							<Link
								className={`${barlow.className} button-secondary`}
								href={'/auth/signup'}>
								Sign up instead
							</Link>
						</div>
					</div>
				</div>
				<div
					className='w-full py-12 px-8 bg-white flex justify-center'
					style={{
						boxShadow: '0px 4px 15px 1px rgba(0, 0, 0, 0.1)',
						borderRadius: '0 4px 4px 0',
					}}>
					{children}
				</div>
			</section>
		);
	},
};

const passwordFormProps: FormProps = {
	fields: {
		password: {
			type: 'text',
			htmlType: 'password',
			label: 'Enter your password',
			placeholder: 'Password',
		},
	},
	onSubmit: (data: any) => {
		if (!data.password) {
			throw new Error('Password is required');
		}
	},
	formTitle: 'Sign in to your account',
	Container: ({ children }: { children: ReactNode }) => (
		<section className='min-h-full flex w-full'>
			<div
				className='w-full py-12 xl:px-8 md:px-4 lg:px-8 bg-white block px-8 md:flex justify-center'
				style={{
					boxShadow: '0px 4px 15px 1px rgba(0, 0, 0, 0.1)',
					borderRadius: '0 4px 4px 0',
				}}>
				{children}
			</div>
		</section>
	),
	styling: {
		formWidth: 'sm:w-[100%] md:w-[75%] xl:w-[50%]',
	},
	SubmitInfo: (
		<div className={`mt-4 w-full flex justify-end text-sm`}>
			<Link
				href={'/auth/password_reset'}
				className='text-blue underline font-[700]'>
				Forgot Password?
			</Link>
		</div>
	),
};

export default function Login() {
	const { push } = useRouter();
	return (
		<main
			className={`md:py-20 md:px-16 sm:py-0 sm:px-0 min-h-screen ${barlow.className}`}>
			<MultiStepForm
				forms={[emailFormProps, passwordFormProps]}
				submitHandler={async ({ data }) => {
					const res = await signIn('credentials', {
						...data,
						redirect: false,
					});
					if (res?.error) {
						toast.error(res.error);
					} else {
						toast.success('Login Successful');
						push('/');
					}
				}}
			/>
		</main>
	);
}
