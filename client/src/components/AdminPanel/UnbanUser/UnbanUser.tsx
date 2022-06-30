import { Link, useNavigate } from 'react-router-dom';
import styleUserList from './UnbanUser.module.css';
import { useUnbanUserMutation } from '../../../slices/app/usersApiSlice';
import SideBar from '../SideBar/SideBar';
import Swal from 'sweetalert2';
import SearchUser from '../UsersList/SearchUser';
import { useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination/usePagination';
import PageButtons from '../../PageButtons/PageButtons';
import { selectAllBanned } from '../../../slices/adminPanelSlice';
import {Toast} from '../../../utils/alerts'
import Loading from '../../Loading/Loading';

const UnbanUser = () => {
  const [unbanUser] = useUnbanUserMutation();
  const pagination = usePagination(10, 'banned');
  const users: any = useSelector(selectAllBanned)
  const navigate = useNavigate();

  const handleDelete = async (email: any) => {
    Swal.fire({
      title: `¿Está seguro que desea desbanear al usuario ${email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'orange',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response: any = await unbanUser({ email })
          if (response.error) throw response.error
          Toast.fire({
            title: `Usuario desbaneado!`,
            icon: 'success',
          });
          navigate('/userslist');
        }
      })
      .catch((err) => {
        if (err.originalStatus === 404) {
          Toast.fire({
            title: `Usuario no encontrado!`,
            icon: 'error'
          })
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
            <h1 className={styleUserList.table_title_style} >Lista de usuarios baneados</h1>
          </div>
          <span style={{ textAlign: "center" }}>
            <SearchUser email={pagination.email} setEmail={pagination.setEmail} searchUserQuery={pagination.searchBannedUserQuery} />
            <div className={styleUserList.filters}>
              <PageButtons page={pagination.page} limit={pagination.limit} pageButtonHandler={pagination.pageButtonHandler} />
            </div>
          </span>
        </div>
        <table className={styleUserList.table_users}>
          <thead className={styleUserList.thead_dark}>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Roles</th>
              <th style={{ textAlign: "center" }}>Action</th>
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
                      <button
                        className={styleUserList.buttom_style_right}
                        onClick={() => handleDelete(user.email)}
                      >
                        Desbanear
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

export default UnbanUser;
