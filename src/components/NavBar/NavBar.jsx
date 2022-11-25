import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.scss";
import imgLogo2 from "../../assets/logoShop.png";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineUserDelete,
  AiOutlineHeart,
} from "react-icons/ai";
import { Button, Avatar } from "@mui/material";

export default function NavBar() {
  const { loginWithRedirect, user, isAuthenticated, logout, isLoading } =
    useAuth0();

  // Hooks
  const [navbarChange, setNavbarChange] = useState(false);

  // Handlers
  const handleChangeNavbarBg = () => {
    if (window.scrollY > 100) {
      setNavbarChange(true);
    } else if (window.scrollY < 100) {
      setNavbarChange(false);
    }
  };

  // Events
  document.addEventListener("scroll", handleChangeNavbarBg);

  return (
    <nav
      className={`${styles.container}
      ${navbarChange && styles.backgroundWhite}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.left}>
          {isLoading ? (
            "Cargando"
          ) : isAuthenticated ? (
            <div style={{ display: "flex" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                <AiOutlineUserDelete style={{ fontSize: 18 }} />
                Logout
              </Button>
              <Button color="success" variant="contained" style={{ marginLeft: 3 }}>
                Dashboard
              </Button>
              <div
                style={{ display: "flex", marginLeft: 5, alignItems: "center" }}
              >
                <Avatar
                  src="https://mui.com/static/images/avatar/1.jpg"
                  alt={user.nickname}
                />
                <span style={{ marginLeft: 3 }}>
                  Hola {user.nickname.toLocaleUpperCase()}!
                </span>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Button variant="outlined" onClick={() => loginWithRedirect()}>
                <AiOutlineUser style={{ fontSize: 18 }} />
                Login
              </Button>
              <Avatar style={{ marginLeft: 5 }} />
            </div>
          )}
        </div>
        <div className={styles.center}>
          <img
            src={imgLogo2}
            alt="Logo Santiago Segurado"
            className={styles.logoBrand}
          />
        </div>
        <div className={styles.right}>
          <Link className={styles.menuItem} to="/">
            INICIO
          </Link>
          <div className={styles.menuItem}>PRODUCTOS</div>
          <div className={styles.menuItem}>
            <AiOutlineHeart style={{ fontSize: 25 }} />
          </div>
          <Link to="/cart">
            <div className={`${styles.menuItem} ${styles.cartItem}`}>
              <div className={styles.cartCounter}>
                <span>1</span>
              </div>
              <AiOutlineShoppingCart style={{ width: 25, height: 25 }} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
