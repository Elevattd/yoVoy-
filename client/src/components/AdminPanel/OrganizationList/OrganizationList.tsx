import {
	useDeleteOrganizationMutation,
} from '../../../slices/app/organizationApiSlice';
import { Link } from 'react-router-dom';
import styleListOrganization from './organization-list.module.css';
import SideBar from '../SideBar/SideBar';
import Swal from 'sweetalert2';
import usePagination from '../../../hooks/usePagination/usePagination';
import { useSelector } from 'react-redux';
import { selectAllOrganizations } from '../../../slices/adminPanelSlice';
import PageButtons from '../../PageButtons/PageButtons';
import Loading from '../../Loading/Loading';

const OrganizationList = () => {
	const [deleteOrganization] = useDeleteOrganizationMutation();
  const organizations = useSelector(selectAllOrganizations)
  const pagination = usePagination(10, 'organizations');

	const handleDelete = async (id: any) => {
		Swal.fire({
			title: 'Esta seguro de eliminar la Organización?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Organización Eliminada!',
					icon: 'success',
				});
				await deleteOrganization(id);
        pagination.refresh()
			}
		});
	};

  const content = !organizations
    ? (
      <div className={styleListOrganization.fondo}>
        <SideBar />
        <Loading />
      </div>
    )
    : (
    <div className={styleListOrganization.fondo}>
      <SideBar />
      <div className={styleListOrganization.table_title}>
        <h1 className={styleListOrganization.table_title_style} >Lista de Organizaciones</h1>
      </div>
      <PageButtons page={pagination.page} limit={pagination.limit} pageButtonHandler={pagination.pageButtonHandler} />
      <table className={styleListOrganization.table_organizations}>
        <tbody className={styleListOrganization.thead_dark}>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Nombre</th>
            <th style={{ textAlign: "center" }}>Acciones</th>
          </tr>
          <div>
          </div>

          {organizations?.rows?.map((organization: any, index: any) => {
            return (
              <tr key={organization.id} className={styleListOrganization.componente}>
                <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450' }}>{index + 1}</th>
                <td className={styleListOrganization.th_organizations}>{organization.name}</td>
                <td className={styleListOrganization.th_organizations}>
                  <Link to={`/update-organization/${organization.id}`} className={styleListOrganization.buttom}>
                    <button className={styleListOrganization.buttom_style_left}>Editar</button>
                  </Link>
                  <button
                    className={styleListOrganization.buttom_style_right}
                    onClick={() => handleDelete(organization.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
	return content;
};

export default OrganizationList;
