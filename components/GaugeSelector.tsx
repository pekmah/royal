'use client';

import { useState } from 'react';

export default function GaugeSelector() {
	const [selected, setSelected] = useState(0);

	const gauges = ['30 - 2M', '30 - 2.1M', '30 - 2.3M', '30 - 2.4M'];

	return (
		<div className='w-full flex justify-between items-center'>
			<p className='font-semibold text-sm'>Gauge Size :</p>
			<div className='flex gap-2'>
				{gauges.map((gauge, idx) => (
					<button
						key={gauge}
						className={`rounded-md text-[12px] py-1 px-2 flex font-medium items-center justify-center ${
							idx === selected
								? 'bg-red text-white'
								: 'bg-white text-black border border-gray'
						}`}
						onClick={() => setSelected(idx)}>
						{gauge}
					</button>
				))}
			</div>
		</div>
	);
}
