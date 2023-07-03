import { ProductSizes } from '@/types/product/Product';

interface Props {
	label: string;
	options: (ProductSizes | null)[];
	onSelectSize: (arg: ProductSizes) => void;
}

export default function SelectSize({ label, options, onSelectSize }: Props) {
	return (
		<div className='w-full flex items-center gap-2 justify-between'>
			<label htmlFor={label} className='text-sm font-semibold mb-1'>
				{label}
			</label>
			{options ? (
				options?.length === 1 ? (
					<span className='bg-red text-white text-[12px] font-medium rounded-md w-fit p-2'>
						{options[0]?.size}
					</span>
				) : (
					<select
						id={label}
						onChange={(e) => {
							const size = options.find(
								(v) => v?.id === parseInt(e.target.value)
							)!;
							onSelectSize(size);
						}}
						className='bg-red text-white text-[12px] font-medium rounded-md w-max p-2 outline-none'>
						{options
							? options.map((option, idx) => (
									<option
										value={option?.id}
										key={option?.id}
										className='bg-white text-black'
										selected={idx === 0}>
										{option?.size}
									</option>
							  ))
							: null}
					</select>
				)
			) : null}
		</div>
	);
}
