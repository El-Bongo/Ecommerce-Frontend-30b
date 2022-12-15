import styles from "./DWidget.module.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import dark from "../../Dark.module.scss";
import { useEffect, useState } from "react";
import { getAll, getAllUser } from "../../../../redux/actions";
import { useNavigate } from "react-router-dom";

export const DWidget = ({ type }) => {
  const [ordenes, setOrdenes] = useState([]);
  const { users } = useSelector((state) => state.panel);
  const { allArticles } = useSelector((state) => state.articles);
  const { darkMode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let data;

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    fetch("https://pf-30b-backend-production.up.railway.app/orders/getAll", { method: "GET" })
      .then((answer) => answer.json())
      .then((data) => setOrdenes(data)
      );
  }, []);

  switch (type) {
    case "user":
      data = {
        navigation: "users",
        amount: users.length,
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
        navigation: "ordenes",
        isMoney: false,
        link: "Ver ordenes",
        amount:ordenes.length,
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
        amount: allArticles.length,
        navigation: "products",
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
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className={styles.link} onClick={() => navigate(data.navigation)}>
          {data.link}
        </span>
      </div>
      <div className={styles.right}>
        {/* <div className={`${styles.percentage} ${styles.positive}`}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};
