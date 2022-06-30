import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartTickets } from '../../../slices/cartSlice';
import CheckoutNavbar from '../CheckoutNavbar/CheckoutNavbar';
import styles from './DeliveryCheckout.module.css';
import style from './DeliveryCheckout.module.css';

const DeliveryCheckout = () => {
	const cartItems = useSelector(selectCartTickets);

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
					<li className="nav startPayment">INICIO PROCESO DE PAGO</li>
					<li className={style.nav_startPayment}>ENTREGA Y CONTROL</li>
					<li className="nav finishPayment">MEDIO DE PAGO</li>
				</ul>
			</nav>

			<div className={style.line}>
				{cartItems.length === 0 ? (
					<p className={styles.cartVacio}>Tu carrito esta vacio</p>
				) : (
					<div className={style.containerBg}>
						<div className={style.containerDetails}>
							<h4>DETALLES</h4>;
							{cartItems?.map((item: any) => {
								return (
									<div key={item.id} className={style.tickets}>
										<p>
											<b>{item.eventName.substring(0, 20)}</b>
											{` | ${item.locationName} | ${item.date}`}
										</p>

										<div>
											<ul>
												<li key={item.id}>
													VALOR TICKET $ <b>{item.price}</b>
												</li>
												<li key={item.id}>
													{`${item.quantity} TICKETS        `} ${' '}
													<b>{item.price * item.quantity}</b>
												</li>
												<li key={item.id}>
													COSTO POR SERVICIO $<b>0.00</b>{' '}
												</li>
											</ul>
										</div>
									</div>
								);
							})}
						</div>
						<div className={style.sendbg}>
							<h4>ENTREGA</h4>
							<hr />
							<div className={style.sendbg2}>
								<h3>Recibira un e-mail con su E-Ticket</h3>
							</div>
						</div>
						<div className={style.mercadoPago}>
							<h4>PAGO</h4>
						</div>
					</div>
				)}

				<h3 className={style.total}>
					{' '}
					TICKETS = Total $ <b>{total.toFixed(2)}</b>
				</h3>

				<div className={style.buttonPassBg}>
					<Link to="/checkout">
						<button className={style.buttonPass}>VOLVER</button>
					</Link>
					<Link to="/checkout/payment">
						<button className={style.buttonPass}>PASO SIGUIENTE</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DeliveryCheckout;
