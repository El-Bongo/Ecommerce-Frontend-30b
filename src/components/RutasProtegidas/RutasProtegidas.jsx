import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const RutasProtegidas = () => {

  const { data } = useSelector(state => state.user)


  if (data.role !== 'admin') {
    return <Navigate to='/' />
  }

  return <Outlet/>
}
