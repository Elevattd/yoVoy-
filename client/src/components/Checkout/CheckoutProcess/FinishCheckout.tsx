import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { clearCart } from '../../../redux/actions/actions-Create';
import CheckoutNavbar from '../CheckoutNavbar/CheckoutNavbar';
import style from './FinishCheckout.module.css';
import spinner from '../../../img/loading.gif';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';

const FinishCheckout = () => {
	const dispatch: any = useDispatch();
	const { resolve }: any = useParams<{ resolve: string }>();
  const navigate = useNavigate()
	const redirect = (): any => {
		setTimeout(
			() =>
				navigate('/purchase-detail'),
			2000,
		);
	};

	useEffect(() => {
		dispatch(clearCart());
		if (resolve === 'approved') {
			Swal.fire({
				title: '¡Pago realizado!',
				text: 'Gracias por tu compra',
				icon: 'success',
				confirmButtonText: 'Continuar',
			}).then(async (result) => {
				console.log('resultado', result.isConfirmed);
				if (result.isConfirmed) {
					redirect();
				}
			});
		} else if (resolve === ('in_process' || 'pending')) {
			Swal.fire({
				title: '¡Pago pendiente!',
				text: 'El pago esta pendiente.',
				icon: 'warning',
				confirmButtonText: 'Continuar',
			}).then(async (result) => {
				console.log('resultado', result.isConfirmed);
				if (result.isConfirmed) {
					redirect();
				}
			});
		} else if (resolve === 'rejected') {
			Swal.fire({
				title: '¡Pago rechazado!',
				text: 'El pago fue rechazado.',
				icon: 'error',
				confirmButtonText: 'Continuar',
			}).then(async (result) => {
				console.log('resultado', result.isConfirmed);
				if (result.isConfirmed) {
					redirect();
				}
			});
		}
	}, [resolve]);

	const result =
		resolve === 'rejected' ? (
			<div className={style.container}>
				<h5>Será redirigido en 2 segundos...</h5>
				<Loading />
			</div>
		) : (
			<div className={style.container}>
				<h2>Gracias por su compra!</h2>
				<h5>Será redirigido en 2 segundos...</h5>
				<Loading />
			</div>
		);

	return (
		<div className={style.container}>
			<CheckoutNavbar />
			{result}
		</div>
	);
};

export default FinishCheckout;
