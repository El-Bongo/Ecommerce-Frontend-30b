import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import styles from "./Navbar.module.scss";
import imgLogo2 from "../../assets/logoShop.png";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineUserDelete, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Button, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Box, SwipeableDrawer } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { cleanItem } from "../../redux/slices/cartSlice";
import { removeFav } from "../../redux/slices/favoriteSlice";
// import { autoBatchEnhancer } from "@reduxjs/toolkit";
import { FloatNav } from "../NavegacionFlotante/FloatNav";

export default function NavBar() {
  // Hooks
  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [navbarChange, setNavbarChange] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { favItem } = useSelector((state) => state.favorite);
  const reduxUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handlers
  const handleChangeNavbarBg = () => {
    if (window.scrollY > 100) {
      setNavbarChange(true);
    } else if (window.scrollY < 100) {
      setNavbarChange(false);
    }
  };

  const toggleDrawer = (types) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    if (types === "cart") setCartOpen(!cartOpen);
    else if (types === "fav") setFavOpen(!favOpen);
  };

  // Events
  document.addEventListener("scroll", handleChangeNavbarBg);

  // Componentes detro del drawer
  const cart = () => (
    <Box sx={{ width: 350 }} role="presentation" className={styles.cartDrawerContainer}>
      <div className={styles.cartDrawerTitle}>
        <h3>Carrito de Compras</h3>
      </div>
      <div className={styles.cartDrawerBody}>
        {cartItems.length !== 0 ? (
          cartItems.map((c) => (
            <div className={styles.cartItem} key={c.id}>
              <div className={styles.cartInfoContainer}>
                <div className={styles.cartItemImg}>
                  <img src={c.images[0]} alt="" width={70} />
                </div>
                <dir className={styles.cartItemTitle}>
                  <h4>{c.title}</h4>
                  <div className={styles.cartItemQuantity}>
                    <span>
                      {c.quantity} x ${c.price}
                    </span>
                  </div>
                </dir>
              </div>
              <HighlightOffIcon style={{ cursor: "pointer" }} onClick={() => dispatch(cleanItem(c.id))} />
            </div>
          ))
        ) : (
          <h4>No hay productos en el carrito</h4>
        )}
      </div>
      <div className={styles.cartFooterContainer}>
        <div className={styles.subtotalContainer}>
          <h3>Subtotal:</h3>
          <span>${cartItems.reduce((subtotal, c) => subtotal + Number(c.price) * Number(c.quantity), 0)}</span>
        </div>
        <Button
          variant="outlined"
          style={{ width: "90%", fontFamily: "inherit" }}
          onClick={() => {
            setCartOpen(false);
            navigate("/cart");
          }}
          disabled={cartItems.length === 0 ? true : false}
        >
          Ir al Checkout
        </Button>
      </div>
    </Box>
  );

  // Componentes detro del drawer favs
  const favorites = () => (
    <Box sx={{ width: 350 }} role="presentation" className={styles.cartDrawerContainer}>
      <div className={styles.cartDrawerTitle}>
        <h3>Favoritos</h3>
      </div>
      <div className={styles.cartDrawerBody} style={{ height: "auto" }}>
        <div className={styles.favDisplay}>
          {favItem.length > 0 ? (
            favItem.map((c) => (
              <div className={styles.favItem} key={c.id}>
                <div className={styles.cartInfoContainer}>
                  <div className={styles.cartItemImg}>
                    <img src={c.images[0]} alt="" width={75} />
                  </div>
                  <dir className={styles.cartItemTitle}>
                    <h4>{c.title}</h4>
                    <p>{c.description}</p>
                  </dir>
                </div>
                <div>
                  <AiFillHeart style={{ cursor: "pointer" }} size={"1.5em"} onClick={() => dispatch(removeFav(c.id))} />
                </div>
              </div>
            ))
          ) : (
            <h4>Aun no tienes nada en favoritos</h4>
          )}
        </div>
      </div>
      <div className={styles.cartFooterContainer}>
        <Button
          variant="outlined"
          style={{ width: "90%", fontFamily: "inherit" }}
          onClick={() => {
            toggleDrawer("fav");
            navigate("/favorites");
          }}
          disabled={favItem.length === 0 ? true : false}
        >
          Ir al Favoritos
        </Button>
      </div>
    </Box>
  );

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
            <div style={{ display: "flex" }} className={styles.btnLogoutContainer}>
              <Button variant="outlined" color="error" onClick={() => logout({ returnTo: window.location.origin })} startIcon={<AiOutlineUserDelete style={{ fontSize: 18 }} />} className={styles.btnLogout} style={{ fontFamily: "inherit" }}>
                Logout
              </Button>
              <Button
                color="success"
                variant="contained"
                className={styles.btnDashboard}
                style={{ fontFamily: "inherit" }}
                onClick={() => navigate('/admin')}
              >
                Dashboard
              </Button>
              <div className={styles.userAvatar}>
                <Avatar src={reduxUser.avatar ? reduxUser.avatar : "https://mui.com/static/images/avatar/1.jpg"} alt={reduxUser.nickname} />
                <span style={{ marginLeft: 3 }}>Hola </span>
                <Link to={"/profile/" + reduxUser.id} style={{ textDecoration: "None", color: "black" }}>
                  {" " + reduxUser.nickname.toLocaleUpperCase()}!
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Button variant="outlined" onClick={() => loginWithRedirect()} startIcon={<AiOutlineUser />} className={styles.btnLogin} style={{ fontFamily: "inherit" }}>
                Login
              </Button>
              <Avatar style={{ marginLeft: 5 }} />
            </div>
          )}
        </div>
        <div className={styles.center}>
          <img src={imgLogo2} alt="Logo Santiago Segurado" className={styles.logoBrand} />
        </div>
        <div className={styles.right}>
          <Link className={styles.menuItem} to="/" id={styles.home}>
            INICIO
          </Link>
          <Link className={styles.menuItem} to="/products" id={styles.products}>
            PRODUCTOS
          </Link>
          <div className={styles.menuItem}>
            {/* input Menu desplegable favoritos */}
            <Fragment>
              <div className={`${styles.menuItem} ${styles.cartItem}`} onClick={toggleDrawer("fav")}>
                {favItem.length !== 0 && (
                  <div className={styles.cartCounter}>
                    <span>{favItem.length}</span>
                  </div>
                )}
                <AiOutlineHeart style={{ width: 25, height: 25 }} />
              </div>
              <SwipeableDrawer anchor={"left"} open={favOpen} onClose={toggleDrawer("fav")} onOpen={toggleDrawer("fav")}>
                {favorites()}
              </SwipeableDrawer>
            </Fragment>
          </div>
          <div>
            {/* input Menu desplegable carrito*/}
            <Fragment>
              <div className={`${styles.menuItem} ${styles.cartItem}`} onClick={toggleDrawer("cart")}>
                {cartItems.length !== 0 && (
                  <div className={styles.cartCounter}>
                    <span>{cartItems.length}</span>
                  </div>
                )}
                <AiOutlineShoppingCart style={{ width: 25, height: 25 }} />
              </div>
              <SwipeableDrawer anchor={"right"} open={cartOpen} onClose={toggleDrawer("cart")} onOpen={toggleDrawer("cart")}>
                {cart()}
              </SwipeableDrawer>
            </Fragment>
          </div>
        </div>
      </div>
      <FloatNav loginWithRedirect={loginWithRedirect} logout={logout} isAuthenticated={isAuthenticated} />
    </nav>
  );
}
