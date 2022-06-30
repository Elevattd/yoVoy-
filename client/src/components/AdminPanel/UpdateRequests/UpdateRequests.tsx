import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUpdateRequestsMutation, useGetRequestQuery } from '../../../slices/app/requestsApiSlices'
import SideBar from '../SideBar/SideBar';
import styleUpdateRequest from './update-request.module.css'
import {Toast} from '../../../utils/alerts'

const UpdateRequests = () => {
    const { id }:any = useParams();
    const navigate = useNavigate();
    const { data: request } = useGetRequestQuery(id);
    const [updateRequest] = useUpdateRequestsMutation();
    const handleClick = async (e:any) => {
      Swal.fire({
        title: `¿Está seguro que ${e.target.value === 'accepted' ? 'aceptar' : 'rechazar'} la solicitud?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'orange',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            const response: any =  await updateRequest({ id, status: e.target.value })
            console.log(response.error.originalStatus)
            if (response.error.originalStatus !== 200) throw response.error
            Toast.fire({
              title: `Petición ${e.target.value === 'accepted' ? 'aceptada' : 'rechazada'}!`,
              icon: 'success',
            });
          navigate("/list-requests")
          }
        })
        .catch((err) => {
            console.log(err)
            Toast.fire({
              title: `Algo salió mal con la petición!`,
              icon: 'error'
            })
        });
    } 
    
    return (
        <div className={styleUpdateRequest.fondo}>
            <div>
                <SideBar/>
            </div>
            <div className={styleUpdateRequest.component}>
                <div className={styleUpdateRequest.envolment}>
                    <p>ID: {request?.id}</p>
                    <p>Descripcion: {request?.description}</p>
                    <p>Metedo: {request?.method}</p>
                    <span style={{textDecoration: 'solid'}}>Estado: {request?.status}</span>
                    <p>Tipo: {request?.type}</p>
                    <p>Informacion de Usuario</p>
                    <p>Id de usuario: {request?.user.id}</p>
                    <p>Nombre de usuario: {request?.user.name}</p>
                    <p>Email de usuario: {request?.user.email}</p>
                    <div className={styleUpdateRequest.confirm_buttons}>
                      <button value={'rejected'} className={`${styleUpdateRequest.request_rejected}`} onClick={handleClick}>
                        Rechazar
                      </button>
                      <button value={'accepted'} className={`${styleUpdateRequest.request_accepted}`} onClick={handleClick}>
                        Aceptar
                      </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateRequests