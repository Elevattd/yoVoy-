import { useEffect, useState } from 'react';
import { useGetFavoritesQuery } from '../../slices/app/usersApiSlice';
import { useDeleteEventToFavoriteMutation } from '../../slices/app/usersApiSlice';
import Card from '../Card/Card';
import style from '../Events/Events.module.css';
import './Favorites.css';
import Swal from 'sweetalert2';

const Favorites = () => {
	const [deleteEventToFavorite] = useDeleteEventToFavoriteMutation();

	const [favorites, setFavorites] = useState<any>([]);
	let { data, isError, isFetching, refetch } = useGetFavoritesQuery(
		{ _: '' },
		{ refetchOnMountOrArgChange: true },
	);
	useEffect(() => {
		if (!isFetching) {
			isError ? setFavorites(['no hay']) : setFavorites(data);
		}
	}, [isFetching]);

	const handleDelete = async (id: any) => {
		Swal.fire({
			title: 'Esta seguro de eliminar el Evento?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Evento Eliminado!',
					icon: 'success',
				});
				deleteEventToFavorite(id);
				refetch();
			}
		});
	};

	const content = isFetching ? (
		<h1>Cargando...</h1>
	) : (
		<div className={favorites[0] !== 'no hay' ? style.container : ''}>
			{favorites &&
				favorites?.length > 0 &&
				favorites?.map((e: any) =>
					e === 'no hay' ? (
						<h1 className={'text_alert'}>No hay favoritos aun</h1>
					) : (
						<div>
							<div className="container_button">

								<button
									className={'deleteFav'}
									onClick={() => {
										handleDelete(e.id);
									}}
								>
									X
								</button>
								<Card key={e.id} event={e} />
							</div>
						</div>
					),
				)}
		</div>
	);
	return <div>{content}</div>;
};

export default Favorites;
