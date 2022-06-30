import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateLocationMutation, useGetLocationQuery } from '../../../slices/app/locationsApiSlice'
import { useGetAllProvinceQuery } from '../../../slices/app/provincesApiSlice'
import Swal from 'sweetalert2';
import SideBar from '../SideBar/SideBar';
import stylelocationUpdate from './update-location.module.css'
import {Toast} from '../../../utils/alerts'

const initialState = {
    name: "",
    latitude: "",
    longitude: "",
    address: "",
    cityId: "",
  }
  const initialErrorState = {...initialState}

const UpdateLocation = () => {
    const [updateLocation] = useUpdateLocationMutation();
    const navigate = useNavigate();
    const { id }: any = useParams<{ id: string }>();
    const { data: cities } = useGetAllProvinceQuery({ _: '' });
    const { data, error, refetch } = useGetLocationQuery(id);
    const [errors, setErrors] = useState(initialErrorState);
    const [location, setLocation] = useState(initialState)

    const validateOrganization = () => {
        const newErrors: any = {};
        if (location.name === '' || !location.name.match(/^[ñíóáéú a-zA-Z[0-9]|[1-9][0-9]|100]+$/i)) {
          newErrors.name = 'El nombre de la organización es requerido';
        }
        if (location.latitude === '') {
          newErrors.latitude = 'La latitude no tiene caracteres';
        }
        if (location.longitude === '') {
          newErrors.longitude = 'El alias de la organización es requerido';
        }
        if(location.address === '') {
            newErrors.address = 'La direccion de la organizacion es requerida';
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return false;
        }
        return true;
      }
    
    useEffect(()=> {
        if(id) {
            if(data) {
                setLocation({ 
                    name: data?.name,
                    latitude: data?.latitude,
                    longitude: data?.longitude,
                    address: data?.address,
                    cityId: data?.city?.name
                })
            }
        } else {
            console.log(error)
        }
    }, [id, data])
    const onChangeName = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});

	};
    const onChangeLatitude = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
    const onChangelongitud = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
	const onChangeAddress = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
    const handleSelect =(e:any) => {
        e.preventDefault();
        setLocation({
          ...location,
          cityId: e.target.value
        });

      }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try{
            if (!validateOrganization()) throw new Error('Campos inválidos');
            Swal.fire({
              title: `Actualizadar ${location.name}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: 'orange',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Crear',
            }).then(async (result) => {
              navigate('/welcome');
              if (result.isConfirmed) {
					id && (await updateLocation({ id: id, updateLocation: location }));
					refetch();
					setLocation({
                        name: "",
                        latitude: "",
                        longitude: "",
                        address: "",
                        cityId: "",
					});
                    Toast.fire({
                        icon: 'success',
                        title: `Locacion ${location.name} actualizada con éxito!`,
                      });
                      window.location.reload();
                    }
                  });
                }catch(error: any){
                  Toast.fire({
                    icon: 'error',
                    title: `Error al Actualizar la locacion: ${error.message}`,
                  });
                }
	};
    return (
        <div className={stylelocationUpdate.fondo}>
            <SideBar/>
            <form onSubmit={onSubmit}>
                <div className={stylelocationUpdate.form_update_location}>
                <fieldset>
                    <legend className={stylelocationUpdate.legend_update_location}>Nombre:</legend>
                    <input 
                       type="text" 
                       name='name'
                       className={stylelocationUpdate.input_update_location}
                       value={location.name}
                       onChange={onChangeName}
                    />
                    {errors.name && <p>{errors.name}</p>}
                </fieldset>
                <fieldset>
                <legend className={stylelocationUpdate.legend_update_location}>Latitud:</legend>
                <input 
                type="text"
                name='latitude' 
                value={location.latitude}
                onChange={onChangeLatitude}
                className={stylelocationUpdate.input_update_location}
                />
                {errors.latitude && <p>{errors.latitude}</p>}
                </fieldset>
                <fieldset>
                <legend className={stylelocationUpdate.legend_update_location}>Longitud:</legend>
                <input 
                type="text" 
                name='longitude'
                value={location.longitude}
                onChange={onChangelongitud}
                className={stylelocationUpdate.input_update_location}
                />
                {errors.longitude && <p>{errors.longitude}</p>}
                </fieldset>
                <fieldset>
                    <legend className={stylelocationUpdate.legend_update_location}>Dirección:</legend>
                    <input 
                       type="text" 
                       name='address'
                       className={stylelocationUpdate.input_update_location}
                       value={location.address}
                       onChange={onChangeAddress}
                    />
                    {errors.address && <p>{errors.address}</p>}
                </fieldset>
                <fieldset>
                <legend className={stylelocationUpdate.legend_update_location}>Provincia:</legend>
                <div>
                <select 
                onChange={(e) => handleSelect(e)} 
                className={stylelocationUpdate.form_locations}>
                    {cities?.rows.map((city: any) => (
                                <option 
                                key={city.id} 
                                value={city.id} 
                                selected={data?.cityId === city.id}
                                className={stylelocationUpdate.form_location}>{city.name}</option>
                            )
                        )
                    }
                </select>
                </div>
                </fieldset>
                <button
                    className={stylelocationUpdate.buttom_update_location}
                    type="submit"
                >
                    Actualizar Locacion
                </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateLocation