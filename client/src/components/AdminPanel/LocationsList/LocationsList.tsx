import React from 'react';
import { Link } from 'react-router-dom';
import styleLocations from './locations-list.module.css';
import Swal from 'sweetalert2';
import SideBar from '../SideBar/SideBar';
import usePagination from '../../../hooks/usePagination/usePagination';
import PageButtons from '../../PageButtons/PageButtons';
import { useSelector } from 'react-redux';
import { selectAllLocations } from '../../../slices/adminPanelSlice';
import Loading from '../../Loading/Loading';

const LocationsList = () => {
  const locations = useSelector(selectAllLocations)
  const pagination = usePagination(10, 'locations');

  
  
  const content = !locations
    ? (
      <div className={styleLocations.fondo}>
        <SideBar />
        <Loading />
      </div>
    )
    :
    (
			<div className={styleLocations.fondo}>
                <SideBar/>
            <div className={styleLocations.table_title}>
            <h1 className={styleLocations.table_title_style}>Lista de Locaciones</h1>
            <Link to='/create-location' className={styleLocations.buttom}>
            <button className={styleLocations.buttom_style}>
                Crear Locacion
            </button>
            </Link>
            </div>
        <PageButtons page={pagination.page} limit={pagination.limit} pageButtonHandler={pagination.pageButtonHandler} />
        <table className={styleLocations.table_categories}>
            <thead>
                <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Nombre</th>
                <th style={{ textAlign: "center" }}>Direccion</th>
                <th style={{ textAlign: "center" }}>Provincia</th>
                <th style={{ textAlign: "center" }}>Acciones</th>
                </tr>
            </thead>

            <tbody>
                { 
                        locations?.rows?.map((location: any, index: any) => {
                            return (
                            <tr className={styleLocations.componente}>
                                <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{location.id}</th>
                                <td className={styleLocations.th_categories}>{location.name}</td>
                                <td className={styleLocations.th_categories}>{location.address}</td>
                                <td className={styleLocations.th_categories}>{location.city.name}</td>
                                <td className={styleLocations.th_categories}>
                                <Link to={`/update-location/${location.id}`} className={styleLocations.buttom}>
                                    <button className={styleLocations.buttom_style_left}>Editar</button>
                                </Link>
                                </td>
                            </tr>
                            );
                            })
                }
                </tbody>
            </table>
        </div>
		);
	return content;
}

export default LocationsList