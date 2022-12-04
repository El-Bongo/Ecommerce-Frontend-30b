import { DUserDatatable } from "../components/Datatable/DUserDatatable";
import { DNavbar } from "../components/Navbar/DNavbar"
import { DSidebar } from "../components/Sidebar/DSidebar";
import styles from './DUsers.module.scss';
import dark from '../Dark.module.scss';
import { useSelector } from 'react-redux'

export const DUsers = () => {

  const { darkMode } =useSelector( state => state.darkmode );

  return (
    <div className={`${styles.list} ${darkMode && dark.dark}`}>
      <DSidebar/>
      <div className={`${styles.listContainer}`}>
        <DNavbar/>
        <DUserDatatable/>
      </div>
    </div>
  )
}
