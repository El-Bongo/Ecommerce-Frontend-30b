import styles from './DWidget.module.scss';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useSelector } from 'react-redux';
import dark from '../../Dark.module.scss';

export const DWidget = ({ type }) => {
  
  const { darkMode } = useSelector(state => state.darkmode)
  
  //De prueba
  let data;
  const amount = 100;
  const diff = 20;


  switch (type) {
    case "user":
      data = {
        title: "USUARIOS",
        isMoney: false,
        link: "Ver usuarios",
        icon: (
          <PersonOutlinedIcon
            className={styles.icon}
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDENES",
        isMoney: false,
        link: "Ver ordenes",
        icon: (
          <ShoppingCartOutlinedIcon
            className={styles.icon}
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "PRODUCTOS",
        isMoney: false,
        link: "Ver productos",
        icon: (
          <MonetizationOnOutlinedIcon
            className={styles.icon}
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className={`${styles.widget} ${darkMode && dark.dark}`}>
      <div className={styles.left}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.counter}>
          {data.isMoney && "$"} {amount}
        </span>
        <span className={styles.link}>{data.link}</span>
      </div>
      <div className={styles.right}>
        <div className={`${styles.percentage} ${styles.positive}`}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

