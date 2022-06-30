import React from 'react'
import { Link } from 'react-router-dom';
import { useGetRequestsQuery } from '../../../slices/app/requestsApiSlices';
import Loading from '../../Loading/Loading';
import SideBar from '../SideBar/SideBar';
import styleRequest from './requests.module.css'

const RequestsList = () => {
    const {
		data: request,
    isFetching,
	} = useGetRequestsQuery({ _: '' }, { refetchOnMountOrArgChange: true });

  const operation : any= {
    POST: 'Creación',
    PUT: 'Actualización',
    DELETE: 'Eliminación',
  }

  const status : any = {
    pending: 'Pendiente',
    accepted: 'Aceptada',
    rejected: 'Rechazada',
  }

  const type : any = {
    organization: 'Organización',
    event: 'Evento',
  }

  const buttons : any = {
    pending: (id: any) => (
      <Link to={`/update-request/${id}`} className={styleRequest.buttom}>
        <button className={`${styleRequest.buttom_style_left}`}>
          Evaluar
        </button>
      </Link>
    ),
    accepted: () => (
        <button className={styleRequest.request_accepted}>
          Aceptada
        </button>
    ),
    rejected: () => (
        <button className={`${styleRequest.request_rejected}`}>
          Rechazada
        </button>
    )
  }


    let content = <span></span>;
    if(!request){
      return isFetching
        ? (
          <div className={styleRequest.fondo}>
            <SideBar />
            <Loading />
          </div>
        )
        :
        (
          <div className={styleRequest.fondo}>
            <SideBar />
            <div className={styleRequest.text}>
              <h1 className={styleRequest.text_style}><i> No hay peticiones realizadas</i></h1>
            </div>
          </div>
        )
    } else {
		 return (
			<div className={styleRequest.fondo}>
                <SideBar/>
            <div className={styleRequest.table_title}>
            <h1 className={styleRequest.table_title_style}>Lista de Peticiones</h1>
            </div>
        <table className={styleRequest.table_categories}>
            <thead>
                <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Operación</th>
                <th style={{ textAlign: "center" }}>Método</th>
                <th style={{ textAlign: "center" }}>Tipo</th>
                {/* <th style={{ textAlign: "center" }}>Descripcion</th> */}
                <th style={{ textAlign: "center" }}>Acciones</th>
                </tr>
            </thead>

            <tbody>
                { 
                        request?.rows?.map((request: any, index: any) => {
                            return (
                            <tr>
                                <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{request.id}</th>
                                <td className={styleRequest.th_categories}>{status[request.status]}</td>
                                <td className={styleRequest.th_categories}>{operation[request.method]}</td>
                                <td className={styleRequest.th_categories}>{type[request.type]}</td>
                                {/* <td className={styleRequest.th_categories}>{request.description}</td> */}
                                <td className={styleRequest.th_categories}>
                                    {buttons[request.status](request.id)}
                                </td>
                            </tr>
                            );
                            })
                }
                </tbody>
            </table>
        </div>
		);
	} 
}

export default RequestsList