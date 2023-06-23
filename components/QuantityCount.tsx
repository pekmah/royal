'use client';

import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export default function QuantityCount() {
	const [count, setCount] = useState(1);
	return (
		<div className='w-full flex justify-between items-center py-4'>
			<p className='font-semibold text-sm'>Quantity :</p>
			<div className='isolate inline-flex -space-x-px rounded-md shadow-sm text-sm'>
				<button
					onClick={() => (count - 1 > 0 ? setCount(count - 1) : null)}
					className='relative inline-flex items-center rounded-l-md px-2 py-2 text-fadegray border border-gray border-r-0 hover:bg-gray hover:text-blue'>
					<AiOutlineMinus />
				</button>
				<input
					type='number'
					className='border flex w-fit text-center border-gray px-2 outline-none font-semibold'
					style={{
						width: '72px',
					}}
					value={count}
					onChange={(e) => {
						const num = parseInt(e.target.value);
						if (num === 0) {
							setCount(1);
						} else {
							setCount(num);
						}
					}}
				/>
				<button
					onClick={() => setCount(count + 1)}
					className='relative inline-flex items-center rounded-r-md px-2 py-2 text-fadegray border border-gray border-l-0 hover:bg-gray hover:text-blue'>
					<AiOutlinePlus />
				</button>
			</div>
		</div>
	);
}
