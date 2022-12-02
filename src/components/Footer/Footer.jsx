import styles from "./Footer.module.scss";
import logo from "../../assets/logoShop.png";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={logo} alt="Santiago Segurado Logo" />

        <div className={styles.social_media_container}>
          <AiFillFacebook
            className={styles.social_icon}
            style={{
              backgroundColor: "#1876F2",
            }}
          />
          <AiOutlineInstagram
            className={styles.social_icon}
            style={{
              backgroundColor: "#D63F6E",
            }}
          />
          <AiFillTwitterCircle
            className={styles.social_icon}
            style={{
              backgroundColor: "#1D9BF0",
            }}
          />
        </div>
      </div>
      <div className={styles.center}>
        <h3 className={styles.title}>Links Utiles</h3>
        <ul >
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <li>Home</li>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <li>Carrrito</li>
          </Link>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li>Tienda</li>
          </Link>
        </ul>
      </div>
      <div className={styles.right}>
        <h3>Medios de Pago</h3>
        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="logo" />
      </div>
    </div>
  );
};
