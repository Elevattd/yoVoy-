import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../EventCart/EventCart.module.css';
import { TicketCart } from '../../EventCart/TicketCart';
import CheckoutNavbar from '../CheckoutNavbar/CheckoutNavbar';
import { Link } from 'react-router-dom';
import { selectCartTickets } from '../../../slices/cartSlice';
import style from './StartCheckout.module.css';

const Checkout = () => {
	const [ticketsLength, setTicketsLength] = useState(0);

	const cartItems = useSelector(selectCartTickets);

	useEffect(() => {
		setTicketsLength(
			cartItems?.reduce(
				(previous: number, current: any) => previous + current?.quantity,
				0,
			),
		);
	}, [cartItems]);

	const total = cartItems?.reduce(
		(previous: number, current: any) =>
			previous + current.quantity * current.price,
		0,
	);

	return (
		<div className={style.container}>
			<CheckoutNavbar />
			<nav>
				<ul className={style.ul}>
					<li className={style.nav_startPayment}>INICIO PROCESO DE PAGO</li>
					<li className="nav controlPayment">ENTREGA Y CONTROL</li>
					<li className="nav finishPayment">MEDIO DE PAGO</li>
				</ul>
			</nav>
			{/* <hr /> */}
			<div className={style.line}></div>
			<div className={style.containerCards}>
				{cartItems.length === 0 ? (
					<p className={styles.cartVacio}>Tu carrito esta vacio</p>
				) : (
					<div className={style.productsContainerBg}>
						<div className={style.productsContainer}>
							{cartItems?.map((item: any) => (
								<TicketCart key={item.dateId} item={item} />
							))}
						</div>
					</div>
				)}
				{/* <hr /> */}
				<h3 className={style.total}>
					{' '}
					TICKETS + CARGO DE SERVICIO = Total $ <b>{total.toFixed(2)}</b>
				</h3>

				<div className={style.buttonPassBg}>
					<Link to="/">
						<button className={style.buttonPass}>VOLVER AL SITIO</button>
					</Link>
					<Link to="/checkout/delivery">
						<button className={style.buttonPass}>SIGUIENTE</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
