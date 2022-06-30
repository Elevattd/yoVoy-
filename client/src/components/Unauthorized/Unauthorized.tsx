import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Unauthorized.css'

const Unauthorized = () => {
  const navigate = useNavigate()

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => navigate(-1)

  return (
    <section className='unauthorized--layout'>
      <div className='unauthorized--container'>
        <h1 className='unauthorized--container-title'>Desautorizado</h1>
        <p className='unauthorized--container-text'>No estas autorizado para entrar a esta página</p>
        <button className='unauthorized--container-backBtn' onClick={goBack}>Volver</button>
        </div>
    </section>
  )
}

export default Unauthorized