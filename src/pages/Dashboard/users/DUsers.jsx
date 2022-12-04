import { DUserDatatable } from "../components/Datatable/DUserDatatable";
import { DNavbar } from "../components/Navbar/DNavbar"
import { DSidebar } from "../components/Sidebar/DSidebar";
import styles from './DUsers.module.scss';

export const DUsers = () => {
  return (
    <div className={styles.list}>
      <DSidebar/>
      <div className={styles.listContainer}>
        <DNavbar/>
        <DUserDatatable/>
      </div>
    </div>
  )
}
