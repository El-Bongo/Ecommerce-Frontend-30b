import { DChart } from "../components/Chart/DChart";
import { DNavbar } from "../components/Navbar/DNavbar";
import { DSidebar } from "../components/Sidebar/DSidebar";
import styles from './DSingleIser.module.scss'
import dark from '../Dark.module.scss';
import { useSelector } from 'react-redux'

export const DSingleUser = () => {

  const { darkMode } =useSelector( state => state.darkmode );

  return (
    <div className={`${styles.single} ${darkMode && dark.dark}`}>
      <DSidebar />
      <div className={styles.singleContainer}>
        <DNavbar />
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.editButton}>Editar</div>
            <h1 className={styles.title}>Informacion</h1>
            <div className={styles.item}>
              <img
                src="https://avatars.githubusercontent.com/u/56309904?s=96&v=4"
                alt=""
                className={styles.itemImg}
              />
              <div className={styles.details}>
                <h1 className={styles.itemTitle}>Santiago Segurado</h1>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Email:</span>
                  <span className={styles.itemValue}>santis@gmail.com</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Nickname:</span>
                  <span className={styles.itemValue}>santis</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Estado:</span>
                  <span className={styles.itemValue}>Activo</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <DChart aspect={3 / 1} title="Ultimos Meses (Gastos)" />
          </div>
        </div>
      </div>
    </div>
  );
};
