'use client';

import { FC, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface AccordionItemProps {
	title: string;
}

const AccordionItem: FC<AccordionItemProps> = ({ title }) => {
	return (
		<div className='w-full hover:bg-grey px-4'>
			<p className='mb-1 ml-4 py-1'>{title}</p>
		</div>
	);
};

interface AccordionProps {
	id: string;
	heading: string;
	content: Array<AccordionItemProps>;
}

const Accordion: FC<AccordionProps> = ({ id, heading, content }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<h2>
				<button
					type='button'
					className={`flex items-center justify-between w-full px-4 font-medium text-left mb-2 ${
						isOpen ? 'active' : ''
					}`}
					onClick={toggleAccordion}
					aria-expanded={isOpen}
					aria-controls={id}>
					<span>{heading}</span>
					{!isOpen ? <BiChevronDown /> : <BiChevronUp />}
				</button>
			</h2>
			<div
				id={id}
				className={`${isOpen ? 'block' : 'hidden'}`}
				aria-labelledby={id}>
				{content.map(({ title }) => (
					<AccordionItem title={title} key={title} />
				))}
			</div>
		</div>
	);
};

export default Accordion;
