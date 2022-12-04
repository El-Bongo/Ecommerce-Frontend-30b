import { useAuth0 } from '@auth0/auth0-react'
import { Outlet, Navigate } from 'react-router-dom'


export const RutasProtegidas = () => {

  const { isAuthenticated } = useAuth0()

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  return <Outlet/>
}
