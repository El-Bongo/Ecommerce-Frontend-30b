import { DChart } from '../components/Chart/DChart';
import { DList } from '../components/List/DList';
import { DNavbar } from '../components/Navbar/DNavbar';
import { DSidebar } from '../components/Sidebar/DSidebar';
import { DWidget } from '../components/Widget/DWidget';
import styles from "./Dashboard.module.scss";
import { useSelector } from 'react-redux'
import dark from '../Dark.module.scss';

export const Dashboard = () => {

  const {darkMode} = useSelector(state => state.darkmode)

  console.log('hola')

  return (
    <div className={`${styles.home} ${darkMode && dark.dark}`}>
      <DSidebar />
      <div className={styles.homeContainer}>
        <DNavbar />
        <div className={styles.widgets}>
          <DWidget type="user" />
          <DWidget type="order" />
          <DWidget type="earning" />
        </div>
        <div className={styles.charts}>
          <DChart title="Ultimos 6 Meses (Ventas)" aspect={2 / 1} />
        </div>
        <div className={styles.listContainer}>
          <div className={styles.listTitle}>Ultimas Trasaccines</div>
          <DList />
        </div>
      </div>
     
    </div> 
  )
}
