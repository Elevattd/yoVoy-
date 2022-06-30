import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../slices/authentication/authSlice";
import LoadingAuth from '../LoadingAuth/LoadingAuth'
import { selectIsLoading } from "../../slices/uiSlice";


interface Props{
  allowedRoles: number[];
}

const RequireAuth = ({allowedRoles}:Props) => {
  const token = useSelector(selectCurrentToken)
  const currentUser: any = useSelector(selectCurrentUser)
  const location = useLocation()
  const loading : boolean = useSelector(selectIsLoading)

  if (loading) {
    return (
      <LoadingAuth/>
    )
  }

  return token && currentUser?.rolesId?.find((role: number) => allowedRoles?.includes(role))
    ? <Outlet />
    : token
      ? <Navigate to="/unauthorized" state={{from: location}} replace />
      : <Navigate to="/loading-auth" state={{from: location}} replace />
}

export default RequireAuth