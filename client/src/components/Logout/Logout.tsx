import React from "react";
import logout_style from "./Logout.module.css"
import { useLogoutMutation} from "../../slices/authentication/authApiSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";


const Logout = ()=>{
    const [logout] = useLogoutMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
      await logout()
      navigate('/home')
    }

    return(
        <div className={logout_style.bg}>      
                <button  className={logout_style.btn} onClick={handleLogout}> <FiLogOut/>Salir</button>
        </div>
    )
}

export default Logout;