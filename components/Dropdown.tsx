import { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';

interface DropdownMenuItemProps {
	active?: boolean;
	children: ReactNode;
	onClick?: () => void;
}

export function DropdownMenuItem({
	active,
	children,
	onClick,
}: DropdownMenuItemProps) {
	return (
		<Menu.Item>
			{({ active }) => (
				<button
					type='button'
					className={`${
						active ? 'bg-grey-100 text-grey-900' : 'text-grey-700'
					} block w-full px-4 py-2 text-left text-sm`}
					onClick={onClick}>
					{children}
				</button>
			)}
		</Menu.Item>
	);
}

interface DropdownMenuProps {
	buttonText: string | ReactNode;
	children: ReactNode;
}

export default function DropdownMenu({
	buttonText,
	children,
}: DropdownMenuProps) {
	return (
		<Menu as='div' className='relative inline-block text-left h-[24px]'>
			<div>
				<Menu.Button>{buttonText}</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'>
				<Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<div className='py-1'>{children}</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
