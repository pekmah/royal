import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
	return (
		<ThreeDots
			height='24'
			width='32'
			radius='9'
			color='#DBDBDB'
			ariaLabel='three-dots-loading'
			wrapperStyle={{}}
			visible={true}
		/>
	);
}
