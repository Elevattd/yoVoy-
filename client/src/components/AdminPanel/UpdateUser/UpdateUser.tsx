import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useGetUserQuery,
	useUpdateUserMutation,
	usePutPasswordMutation,
} from '../../../slices/app/usersApiSlice';
import SideBar from '../SideBar/SideBar';
import UpdateRol from '../UpdateRol/UpdateRol';
import styleUser from './update-user.module.css';
import { validateEmail, validateUser } from './UpdateUserValidate';
import {Toast} from '../../../utils/alerts'
import Swal from 'sweetalert2';

const Updateuser = () => {
	const [updateUser] = useUpdateUserMutation();
	const [updatePassword] = usePutPasswordMutation();
	const { id }: any = useParams<{ id: string }>();
	const [errorsUser, setErrorsUser]: any = useState({});
	const [errorsEmail, setErrorsEmail]: any = useState({});
	const navigate = useNavigate();
	const { data, error, refetch } = useGetUserQuery(id);
	const [user, setUser] = useState({
		name: '',
		email: '',
	});

	useEffect(() => {
		if (id) {
			if (data) {
				setUser({ ...data });
			}
		} else {
			console.log(error);
		}
	}, [id, data]);

	const onChangeEmail = (e: any) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
		setErrorsEmail(validateEmail({ ...user, [e.target.name]: e.target.value }));
	};
	const onChangeUser = (e: any) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
		setErrorsUser(validateUser({ ...user, [e.target.name]: e.target.value }));
	};
	const hanldePutPassword = async (id: any) => {
		Swal.fire({
			title: 'Seguro que quieres cambiar la contraseña?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Cambiar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: `Contraseña cambiada!`,
					icon: 'success',
					confirmButtonColor: 'orange',
				});
				await updatePassword({ userId: id });
				refetch();
			}
		});
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			Swal.fire({
				title: 'Seguro que quieres actualizar el Usuario?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: 'orange',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Actualizar',
			}).then(async (result) => {
				if (result.isConfirmed) {
					Toast.fire({
						title: `Usuario actualizado!`,
						icon: 'success',
					});
					id && (await updateUser({ id: id, updateUser: user }));
					refetch();
					setUser({
						name: '',
						email: '',
					});
					navigate('/userslist');
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<React.Fragment>
			<div className={styleUser.fondo}>
				<SideBar />
				<div className={styleUser.centralize}>
					<div className={styleUser.tab}>
						<input id="tab-1" type="checkbox" className={styleUser.input} />
						<label htmlFor="tab-1" className={styleUser.label}>
							Actualizar Rol
						</label>
						<div className={styleUser.content}>
							<UpdateRol />
						</div>
					</div>

					<div className={styleUser.tab}>
						<input id="tab-2" type="checkbox" className={styleUser.input} />
						<label htmlFor="tab-2" className={styleUser.label}>
							Forzar Contraseña
						</label>
						<div className={styleUser.content}>
							<div style={{ display: 'grid', justifyContent: 'center' }}>
								<button
									onClick={() => hanldePutPassword(id)}
									className={styleUser.button_user}
								>
									Forzar Contraseña
								</button>
							</div>
						</div>
					</div>

					<div className={styleUser.tab}>
						<input id="tab-3" type="checkbox" className={styleUser.input} />
						<label htmlFor="tab-3" className={styleUser.label}>
							Actualizar usuario
						</label>
						<div className={styleUser.content}>
							<form onSubmit={onSubmit}>
								<div className={styleUser.form_user}>
									<fieldset>
										<legend>Nombre:</legend>
										<input
											type="text"
											name="name"
											autoComplete="off"
											className={styleUser.inputs_user}
											value={user.name}
											onChange={onChangeUser}
										/>
										{errorsUser.name && <p>{errorsUser.name}</p>}
									</fieldset>{' '}
									<br />
									<fieldset>
										<legend>Email:</legend>
										<input
											type="text"
											name="email"
											autoComplete="off"
											className={styleUser.inputs_user}
											value={user.email}
											onChange={onChangeEmail}
										/>
										{errorsEmail.email && <p>{errorsEmail.email}</p>}
									</fieldset>
									<button
										type="submit"
										className={styleUser.button_user}
										disabled={
											Object.keys(errorsEmail).length > 0 ||
											Object.keys(errorsUser).length > 0 ||
											errorsEmail.email ||
											errorsUser.name
												? true
												: false
										}
									>
										Actualizar Usuario
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Updateuser;
