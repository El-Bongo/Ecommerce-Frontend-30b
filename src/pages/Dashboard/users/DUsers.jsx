import { DUserDatatable } from "../components/Datatable/DUserDatatable";
import { DNavbar } from "../components/Navbar/DNavbar"
import { DSidebar } from "../components/Sidebar/DSidebar";
import styles from './DUsers.module.scss';
import dark from '../Dark.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from "../../../redux/actions";
import { useEffect } from "react";

export const DUsers = () => {

  const dispatch = useDispatch();
  const { darkMode } =useSelector( state => state.darkmode );

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch])
  

  return (
    <div className={`${styles.users} ${darkMode && dark.dark}`}>
      <DSidebar/>
      <div className={`${styles.usersContainer}`}>
        <DNavbar/>
        <DUserDatatable/>
      </div>
    </div>
  )
}
