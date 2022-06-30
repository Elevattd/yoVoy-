import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaList } from "react-icons/fa";
import { FiHome, FiLogOut, FiEdit, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";
import "./side-bar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../slices/authentication/authSlice";
import { useLogoutMutation } from "../../../slices/authentication/authApiSlice";


const SideBar = () => {
    const currentUser : any = useSelector(selectCurrentUser)
    const currentRole = currentUser ? currentUser.rolesId.slice(-1) : null
    const [menuCollapse, setMenuCollapse] = useState(false)

    const [logout] = useLogoutMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
      await logout()
      navigate('/home')
    }

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <span>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              <p>{menuCollapse ? "Panel" : "Panel"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<FiHome />}>
                <NavLink style={{ color: 'white' }} to='/' className='link'>
                  Home
                </NavLink>
              </MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/userslist' className='link'>Lista De Usuarios</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/organization-list' className='link'>Lista De Organizaciones</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/detail-payment' className='link'>Detalles de Compras</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/events-config' className='link'>Lista de Eventos</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/list-categories' className='link'>Lista de Categorias</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/list-locations' className='link'>Lista de Locaciones</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/list-provinces' className='link'>Lista de Provincias</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/unban-user' className='link'>Desbanear Usuario</NavLink></MenuItem>
              <MenuItem icon={<FaList />}><NavLink to='/list-requests' className='link'>Lista de Peticiones</NavLink></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </span>
  );
};

export default SideBar;
