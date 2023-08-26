import {useCartContext} from '@/context/CartContext';
import {ProductSizes} from '@/types/product/Product';

interface Props {
    activeSize: ProductSizes | null | undefined;
    quantity: number;
    total: number | null
}

export default function CostDisplay({activeSize, quantity, total}: Props) {
    const {increaseQuantity, decreaseQuantity} = useCartContext()
    return (
        <div className='flex justify-between flex-1 w-full items-center h-max'>
            <p className='font-semibold text-sm py-1'>Price:</p>
            <div className='font-semibold text-sm'>
                {activeSize?.discounted && activeSize?.percentage_discount ? (
                    <div className='flex gap-4 items-center'>
						<span>
							Ksh.{' '}
                            {activeSize.price *
                                ((100 - activeSize?.percentage_discount) / 100) *
                                quantity}
						</span>
                        <span className='text-fadegrey line-through'>
							Ksh. {activeSize ? activeSize.price * quantity : '-'}
						</span>
                        <span className='px-2 py-1 rounded-md text-primary_red bg-grey'>
							{`${activeSize?.percentage_discount}% Off`}
						</span>
                    </div>
                ) : (
                    <span>Ksh. {total}</span>
                )}
            </div>
        </div>
    );
}
