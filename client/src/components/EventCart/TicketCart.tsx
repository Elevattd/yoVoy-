import React from 'react';
import { useDispatch } from 'react-redux';
import {
	deleteFromCart,
	changeQuantity,
} from '../../redux/actions/actions-Create';
import styles from './TicketCart.module.css';

export const TicketCart = ({ item }: any) => {
	let [quantity, setQuantity] = React.useState(item.quantity);
	const dispatch: any = useDispatch();
	const handleRemove = () => {
		dispatch(deleteFromCart(item) as any);
	};
	const handleQuantityChange = (e: any) => {
		e.preventDefault();
		if (e.target.value === '-') {
			if (quantity > 1) {
				setQuantity(quantity - 1);
				dispatch(changeQuantity(item, quantity - 1));
			}
		} else {
			setQuantity(quantity + 1);
			dispatch(changeQuantity(item, quantity + 1));
		}
	};

	return (
		<div className={styles.cartItem}>
			<img src={item.eventImg} alt={item.eventName} />
			<div className={styles.dataContainer}>
				<div className={styles.left}>
					<p className={styles.title}>{item.eventName}</p>
					<p>{item.date}</p>
				</div>
				<div className={styles.right}>
					<button onClick={handleRemove} className={styles.remove}>
						X
					</button>
					<div className={styles.quantity}>
						<button value="-" onClick={handleQuantityChange}>
							-
						</button>
						<p>{item.quantity}</p>
						<button value="+" onClick={handleQuantityChange}>
							+
						</button>
					</div>
					<p>${item.quantity * item.price}</p>
				</div>
			</div>
		</div>
	);
};
