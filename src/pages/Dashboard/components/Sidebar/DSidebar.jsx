import styles from "./DSidebar.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dark, light } from "../../../../redux/slices/darkmodeSlice";
import darkk from "../../Dark.module.scss";

export const DSidebar = () => {
  const { darkMode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();

  return (
    <div className={`${styles.sidebar} ${darkMode && darkk.sidebar}`}>
      <div className={styles.top}>
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className={styles.logo}>Tienda Tech</span>
        </Link>
      </div>
      <hr />
      <div className={styles.center}>
        <ul>
          <p className={styles.title}>DASHBOARD</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className={styles.icon} />
              <span>Home</span>
            </li>
          </Link>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className={styles.icon} />
              <span>Usuarios</span>
            </li>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className={styles.icon} />
              <span>Productos</span>
            </li>
          </Link>
          <li>
            <Link to="/admin/ordenes" style={{ textDecoration: "none" }}>
              <CreditCardIcon className={styles.icon} />
              <span>Ordenes</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/reportedReviews" style={{ textDecoration: "none" }}>
              <ReportProblemIcon className={styles.icon} />
              <span>Reportes</span>
            </Link>
          </li>

          <p className={styles.title}>USER</p>
          <Link to="/admin/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className={styles.icon} />
              <span>Perfil</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className={styles.icon} />
              <span>Volver a Tienda</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.colorOption} onClick={() => dispatch(light())}></div>
        <div className={styles.colorOption} onClick={() => dispatch(dark())}></div>
      </div>
    </div>
  );
};
