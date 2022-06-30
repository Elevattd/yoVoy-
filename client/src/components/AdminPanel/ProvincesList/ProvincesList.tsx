import { useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination/usePagination';
import { selectAllProvinces } from '../../../slices/adminPanelSlice';
import SideBar from '../SideBar/SideBar';
import styleProvinces from './provinces-list.module.css'
import PageButtons from '../../PageButtons/PageButtons';
import Loading from '../../Loading/Loading';

const ProvincesList = () => {
  const provinces = useSelector(selectAllProvinces)
  const pagination = usePagination(10, 'provinces');
  const content = !provinces
    ? (
      <div className={styleProvinces.fondo}>
        <SideBar />
        <Loading />
      </div>
    )
    :
    (
        <div className={styleProvinces.fondo}>
                  <SideBar/>
              <div className={styleProvinces.table_title}>
              <h1 className={styleProvinces.table_title_style}>Lista de Provincias</h1>
              </div>
          <PageButtons page={pagination.page} limit={pagination.limit} pageButtonHandler={pagination.pageButtonHandler} />
          <table className={styleProvinces.table_categories}>
              <thead>
                  <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>Nombre</th>
                  </tr>
              </thead>

              <tbody>
                  { 
                          provinces?.rows?.map((city: any, index: any) => {
                              return (
                              <tr className={styleProvinces.componente}>
                                  <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{city.id}</th>
                                  <td className={styleProvinces.th_categories}>{city.name}</td>
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

export default ProvincesList