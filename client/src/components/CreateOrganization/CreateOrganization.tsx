import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrganizationRequestMutation } from '../../slices/app/organizationApiSlice';
import { selectCurrentUser } from '../../slices/authentication/authSlice';
import SideBar from '../AdminPanel/SideBar/SideBar';
import styleCreateOrganization from './create-organization.module.css';
import Swal from 'sweetalert2';
import {Toast} from '../../utils/alerts'

const initialState = {
  name: '',
  cuit: '',
  phone_number: '',
  cbu: '',
  alias: '',
  business_email: ''
}
const initialErrorState = {
  ...initialState,
  description: ''
}

const CreateOrganization = () => {
	const navigate = useNavigate();
	const currentUser: any = useSelector(selectCurrentUser);
	const [createOrganizationRequest] = useCreateOrganizationRequestMutation();
	const [organization, setOrganization] = useState(initialState);
  const [errors, setErrors] = useState(initialErrorState)

  const [description, setDescription] = useState('');

	const onInputChange = (e: any) => {
		e.preventDefault();
    setErrors(initialErrorState)
    if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
    else{
      setOrganization({
        ...organization,
        [e.target.name]: e.target.value,
      });
    }
	};

  const validateOrganization = () => {
    const newErrors: any = {};
    if (organization.name === '' || !organization.name.match(/^[ñíóáéú a-zA-Z[0-9]|[1-9][0-9]|100]+$/i)) {
      newErrors.name = 'El nombre de la organización es requerido';
    }
    if (description === '' || description.length < 50) {
      newErrors.description = 'La descripción de la organización es requerida y debe tener al menos 50 caracteres';
    }
    if (organization.cuit === ''  || organization.cuit.length < 11) {
      newErrors.cuit = 'El CUIT de la organización es requerido y debe tener al menos 11 caracteres';
    }
    if (organization.phone_number === '' || organization.phone_number.length < 8) {
      newErrors.phone_number = 'El teléfono de la organización es requerido y debe tener al menos 8 caracteres';
    }
    if (organization.cbu === '' || organization.cbu.length < 15) {
      newErrors.cbu = 'El CBU de la organización es requerido y debe tener al menos 15 caracteres';
    }
    if (organization.alias === '') {
      newErrors.alias = 'El alias de la organización es requerido';
    }
    if (organization.business_email === '' || !organization.business_email.match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    )) {
      newErrors.business_email = 'El email de la organización es requerido y debe ser un email válido';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  }

	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(organization.name);
    try{
      if (!validateOrganization()) throw new Error('Campos inválidos');
      Swal.fire({
        title: `Crear Organización ${organization.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'orange',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Crear',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await createOrganizationRequest({ description, body: organization });
          setOrganization(initialState);
          Toast.fire({
            icon: 'success',
            title: `La petición para crear una organización fue enviada con exito, espere la respuesta de un administrador.`,
          });
          navigate('/welcome');
        }
      });
    }catch(error: any){
      Toast.fire({
        icon: 'error',
        title: `Error al crear la organización: ${error.message}`,
      });
    }
	};
	return (
		<div>
			{currentUser.rolesId[2] && <SideBar />}
			{currentUser && (
				<form onSubmit={onSubmit}>
					<div className={styleCreateOrganization.form_create_organization}>
						<fieldset>
							<legend
								className={styleCreateOrganization.legend_create_organization}
							>
								Nombre de la Organizacion:
							</legend>
							<input
								type="text"
								placeholder="Nombre"
								name="name"
								className={styleCreateOrganization.input_create_organization}
								onChange={onInputChange}
								value={organization.name}
							/>
              {errors.name && <p>{errors.name}</p>}
						</fieldset>
						<fieldset>
							<legend
								className={styleCreateOrganization.legend_create_organization}
							>
								Descripción de la Organizacion:
							</legend>
							<textarea
								placeholder="Nos dedicamos a..."
								name="description"
								className={styleCreateOrganization.textarea_create_organization}
								onChange={onInputChange}
								value={description}
							/>
              {errors.description && <p>{errors.description}</p>}
						</fieldset>
            <fieldset>
              <legend
                className={styleCreateOrganization.legend_create_organization}
              >
                Cuit:
              </legend>
              <input
                type="number"
                placeholder="XX-XXXXXXXXXX-X"
                name="cuit"
                className={styleCreateOrganization.input_create_organization}
                onChange={onInputChange}
                value={organization.cuit}
              />
              {errors.cuit && <p>{errors.cuit}</p>}
            </fieldset>
            <fieldset>
              <legend
                className={styleCreateOrganization.legend_create_organization}
              >
                Teléfono:
              </legend>
              <input
                type="number"
                placeholder="1512345678"
                name="phone_number"
                className={styleCreateOrganization.input_create_organization}
                onChange={onInputChange}
                value={organization.phone_number}
              />
              {errors.phone_number && <p>{errors.phone_number}</p>}
            </fieldset>
            <fieldset>
              <legend
                className={styleCreateOrganization.legend_create_organization}
              >
                CBU:
              </legend>
              <input
                type="number"
                placeholder="7396600511100016830892"
                name="cbu"
                className={styleCreateOrganization.input_create_organization}
                onChange={onInputChange}
                value={organization.cbu}
              />
              {errors.cbu && <p>{errors.cbu}</p>}
            </fieldset>
            <fieldset>
              <legend
                className={styleCreateOrganization.legend_create_organization}
              >
                Alias:
              </legend>
              <input
                type="text"
                placeholder="Alias"
                name="alias"
                className={styleCreateOrganization.input_create_organization}
                onChange={onInputChange}
                value={organization.alias}
              />
              {errors.alias && <p>{errors.alias}</p>}
            </fieldset>
            <fieldset>
              <legend
                className={styleCreateOrganization.legend_create_organization}
              >
                Email Empresarial:
              </legend>
              <input
                type="text"
                placeholder="organizacion@gmail.com"
                name="business_email"
                className={styleCreateOrganization.input_create_organization}
                onChange={onInputChange}
                value={organization.business_email}
              />
              {errors.business_email && <p>{errors.business_email}</p>}
            </fieldset>
						<button
							className={styleCreateOrganization.buttom_create_organization}
							type="submit"
						>
							¡Crear Organizacion!
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default CreateOrganization;
