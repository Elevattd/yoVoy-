import { Link } from 'react-router-dom';
import styleUserList from './user-list.module.css';
import { useDeleteUserMutation } from '../../../slices/app/usersApiSlice';
import SideBar from '../SideBar/SideBar';
import Swal from 'sweetalert2';
import SearchUser from './SearchUser';
import { useSelector } from 'react-redux';
import FilterUser from './FilterUser';
import usePagination from '../../../hooks/usePagination/usePagination';
import PageButtons from '../../PageButtons/PageButtons';
import { selectAllUsers } from '../../../slices/adminPanelSlice';
import Loading from '../../Loading/Loading';

const UsersList = () => {
	const [deleteUser] = useDeleteUserMutation();
	const pagination = usePagination(10, 'users');
  const users : any = useSelector(selectAllUsers)
	
	const handleDelete = async (id: any) => {
		Swal.fire({
			title: 'Esta seguro de Banear el Usuario?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Banear',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Usuario baneado!',
					icon: 'success',
				});
				await deleteUser(id);
        pagination.refresh()
			}
		});
	};

  const content = !users
  ? (
    <div className={styleUserList.fondo}>
        <SideBar />
        <Loading />
    </div>
  )
  : 
  (
    <div className={styleUserList.fondo}>
      <SideBar />
      <div>
        <div className={styleUserList.table_title}>
          <h1 className={styleUserList.table_title_style} >Lista de usuarios</h1>
        </div>
        <span style={{ textAlign: "center" }}>
          <SearchUser email={pagination.email} setEmail={pagination.setEmail} searchUserQuery={pagination.searchUserQuery}/>
          <div className={styleUserList.filters}>
            <FilterUser userOrder={pagination.userOrder} setUserOrder={pagination.setUserOrder}/>
            <PageButtons page={pagination.page} limit={pagination.limit} pageButtonHandler={pagination.pageButtonHandler} />
          </div>
        </span>
      </div>
      <table className={styleUserList.table_users}>
        <thead className={styleUserList.thead_dark}>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Nombre</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Roles</th>
            <th style={{ textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {
            users?.rows?.map((user: any, index: any) => {
              return (
                <tr key={user.id} className={styleUserList.componente}>
                  <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450' }}>{user.id}</th>
                  <td className={styleUserList.th_users}>{user.name}</td>
                  <td className={styleUserList.th_users}>{user.email}</td>
                  <td className={styleUserList.th_users}>{user.roles.map((e: any) => e.name + ' ')}</td>
                  <td className={styleUserList.th_users}>
                    <Link to={`/update-user/${user.id}`} className={styleUserList.buttom}>
                      <button className={styleUserList.buttom_style_left}>Editar Usuario</button>
                    </Link>
                    <button
                      className={styleUserList.buttom_style_right}
                      onClick={() => handleDelete(user.id)}
                    >
                      Banear
                    </button>
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
};

export default UsersList;
