import { Oval } from 'react-loader-spinner';

export default function CircleLoader() {
	return (
		<Oval
			height='24'
			width='24'
			color='#DC2A25'
			ariaLabel='circle-loading'
			wrapperStyle={{}}
			visible={true}
			strokeWidth={4}
			strokeWidthSecondary={4}
		/>
	);
}
