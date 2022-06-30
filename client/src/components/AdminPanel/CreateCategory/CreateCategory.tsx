import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCreateCategoryMutation } from '../../../slices/app/categoriesApiSlice';
import SideBar from '../SideBar/SideBar';
import styleCreateCategory from './create-category.module.css';
import {Toast} from '../../../utils/alerts'
import Swal from 'sweetalert2';

const CreateCategory = () => {
	const navigate = useNavigate();

	const [createCategory] = useCreateCategoryMutation();
	const [category, setCategory] = useState({
		name: '',
	});

	const onInputChange = (e: any) => {
		e.preventDefault();
		setCategory({
			...category,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		Swal.fire({
			title: `Crear Categoría ${category.name}?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Crear',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Toast.fire({
					title: `Caterogía creada!`,
					icon: 'success',
				});
				console.log(category.name);
				if (category) await createCategory({ category: category.name });
				setCategory({
					name: '',
				});
				navigate('/');
			}
		});
	};
	return (
		<div className={styleCreateCategory.fondo}>
			<SideBar />
			<form onSubmit={onSubmit}>
				<div className={styleCreateCategory.form_create_category}>
					<fieldset>
						{/* <label>Nombre de la Categoria</label> <br /> */}
						<legend className={styleCreateCategory.legend_create_category}>
							Nombre de la Categoria:
						</legend>
						<input
							type="text"
							placeholder="Nombre"
							name="name"
							required
							className={styleCreateCategory.input_create_categoty}
							onChange={onInputChange}
							value={category.name}
						/>
					</fieldset>{' '}
					<br />
					<button
						className={styleCreateCategory.buttom_create_category}
						type="submit"
					>
						¡Crear Categoria!
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateCategory;
