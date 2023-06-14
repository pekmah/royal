'use client';

import useMultiStepForm from '@/hooks/useMultiStepForm';
import { FormProps } from './Form/types/form.types';
import { Form } from './Form';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function MultiStepForm({
	forms,
	submitHandler,
}: {
	forms: Array<FormProps>;
	submitHandler: (data: any) => Promise<any>;
}) {
	const { next, previous, step, index } = useMultiStepForm(forms);
	const [formData, setFormData] = useState({});
	const onSubmit = step.onSubmit;
	const [loading, setLoading] = useState(false);

	return (
		<Form
			{...step}
			onSubmit={async (data) => {
				const newData = { ...formData, data };
				setFormData(newData);
				setLoading(true);
				try {
					await onSubmit(data);
					if (index !== forms.length - 1) {
						next();
					} else {
						submitHandler(newData)
							.then((res) => {
								// return res.data;
							})
							.catch((err: any) => {
								toast.error(err.message);
							});
					}
				} catch (e: any) {
					toast.error(e.message);
				}
				setLoading(false);
			}}
			submitText={index === forms.length - 1 ? 'Finish' : 'Continue'}
			multistep={{
				previousStep: index !== 0 ? previous : undefined,
			}}
			isLoading={loading}
		/>
	);
}
