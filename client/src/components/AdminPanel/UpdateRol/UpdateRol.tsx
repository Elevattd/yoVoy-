import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useGetUserQuery,
	useUpdateRolUserMutation,
} from '../../../slices/app/usersApiSlice';
import ROLES_LIST from '../../../slices/authentication/rolesList';
import styleRol from './update-rol.module.css';
import {Toast} from '../../../utils/alerts'
import Swal from 'sweetalert2';

const UpdateRol = () => {
	const [updateRolUser] = useUpdateRolUserMutation();
	const { id }: any = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { data, error, refetch } = useGetUserQuery(id);
	const [user, setUser] = useState({
		name: '',
		roles: '',
	});

	let mappeRoles = data?.roles.map((e: any) => e.id);
	let order = mappeRoles?.sort((a: any, b: any) => a - b);
	let admin = order?.pop();

	useEffect(() => {
		setUser({
			name: data?.name || '',
			roles: mappeRoles || '',
		});
	}, [id, data]);
	const onChangeRol = (e: any) => {
		e.preventDefault();
		setUser({
			...user,
			roles: e.target.value,
		});
	};
	const onChangeUser = (e: any) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			Swal.fire({
				title: 'Seguro que quieres cambiar el rol del Usuario?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: 'orange',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Cambiar',
			}).then(async (result) => {
				if (result.isConfirmed) {
					Toast.fire({
						title: `Rol cambiado!`,
						icon: 'success',
					});
					id &&
						(await updateRolUser({
							userId: (user.name = data?.id),
							roleId: user.roles,
						}));
					refetch();
					setUser({
						name: '',
						roles: '',
					});
					navigate('/userslist');
				}
			});
			id &&
				(await updateRolUser({
					userId: (user.name = data?.id),
					roleId: user.roles,
				}));
			// refetch();
			// setUser({
			// 	name: '',
			// 	roles: '',
			// });
			// navigate('/userslist');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className={styleRol.form_create_rol}>
					<fieldset className={styleRol.fieldset_form}>
						<legend className={styleRol.legend_rol}>Nombre de Usuario:</legend>
						<input
							type="text"
							className={styleRol.input_rol}
							value={user.name}
							onChange={onChangeUser}
						/>
					</fieldset>
					<br />
					<fieldset className={styleRol.fieldset_form}>
						<legend className={styleRol.legend_rol}>Rol de usuario:</legend>
						<select
							onChange={(e) => onChangeRol(e)}
							className={styleRol.form_roles}
						>
							<option
								value={ROLES_LIST.Admin}
								selected={ROLES_LIST.Admin === admin}
								className={styleRol.form_rol}
							>
								Administrador
							</option>
							<option
								value={ROLES_LIST.Organization}
								selected={ROLES_LIST.Organization === admin}
								className={styleRol.form_rol}
							>
								Organizacion
							</option>
							<option
								value={ROLES_LIST.User}
								selected={ROLES_LIST.User === admin}
								className={styleRol.form_rol}
							>
								Usuario
							</option>
						</select>{' '}
						<br />
						<br />
					</fieldset>
					<button type="submit" className={styleRol.buttom_rol}>
						Actualizar Rol de Usuario
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateRol;
