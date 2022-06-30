import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateCategoryMutation, useGetCategoryQuery } from '../../../slices/app/categoriesApiSlice'
import Swal from 'sweetalert2';
import SideBar from '../SideBar/SideBar';
import styleCategoryUpdate from './update-category.module.css'
import {Toast} from '../../../utils/alerts'

const UpdateCategory = () => {
    const [updateCategory] = useUpdateCategoryMutation();
    const navigate = useNavigate();
    const { id }: any = useParams<{ id: string }>();
    const { data, error, refetch } = useGetCategoryQuery(id);
    const [category, setCategory] = useState({
        name: '',
    })
    useEffect(()=> {
        if(id) {
            if(data) {
                setCategory({ ...data})
            }
        } else {
            console.log(error)
        }
    }, [id, data])
    const onChangeName = (e: any) => {
		e.preventDefault();
		setCategory({
			...category,
			[e.target.name]: e.target.value,
		});
	};
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			Swal.fire({
				title: 'Seguro que quieres actualizar la Categoria?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: 'orange',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Actualizar',
			}).then(async (result) => {
				if (result.isConfirmed) {
					Toast.fire({
						title: `Categoria actualizada!`,
						icon: 'success',
					});
					id && (await updateCategory({ id: id, updateCategory: category }));
					refetch();
					setCategory({
                        name: '',
					});
					navigate('/list-categories');
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
    return (
        <div className={styleCategoryUpdate.fondo}>
            <SideBar/>
            <form onSubmit={onSubmit}>
                <div className={styleCategoryUpdate.form_update_location}>
                <fieldset>
                    <legend className={styleCategoryUpdate.legend_update_location}>Nombre:</legend>
                    <input 
                       type="text" 
                       name='name'
                       value={category.name}
                       onChange={onChangeName}
                       className={styleCategoryUpdate.input_update_location}
                    />
                </fieldset>
                <button
                    type="submit"
                    className={styleCategoryUpdate.buttom_update_location}
                >
                    Actualizar Categoria
                </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateCategory;