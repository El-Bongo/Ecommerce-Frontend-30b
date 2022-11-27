import Products from "./pages/Products/Products";
import { Route, Routes } from "react-router-dom";
import { localStorageCart } from "./redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import Detalles from "./pages/Detalles/Detalles";
import AddArticle from "./pages/AddArticle/AddArticle";
import SuccessPurchase from "./pages/SuccessPurchase/SuccessPurchase";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.module.scss";
import MetaMaskStatus from "./pages/MetaMaskStatus/MetaMaskStatus";
import { Home } from "./pages/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { BottomNav } from "./components/BottomNavigation/BottomNav";
import { addWidthAndHeight } from "./redux/slices/windowSlice";

function App() {
  const dispatch = useDispatch();
  const carro = useSelector((state) => state.cart.cartItems);

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      dispatch(
        localStorageCart(JSON.parse(window.localStorage.getItem("cart")))
      );
    }
  }, [dispatch, isLoading, isAuthenticated]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetch("http://localhost:3001/users/checkGoogleFacebook", {
        method: "POST",
        body: JSON.stringify(user),
        headers: new Headers({ "content-type": "application/json" }),
      }).then(() =>
        fetch("http://localhost:3001/cart/getCart", {
          method: "POST",
          body: JSON.stringify({ user }),
          headers: new Headers({ "content-type": "application/json" }),
        })
          .then((answer) => answer.json())
          .then((data) =>
            dispatch(
              localStorageCart(
                data.articles.map((x) => {
                  return { ...x, quantity: x.cartitems.quantity };
                })
              )
            )
          )
      );
    }
  }, [isLoading, isAuthenticated, user, dispatch]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setTimeout(
        () =>
          fetch("http://localhost:3001/cart/updateCart", {
            method: "POST",
            body: JSON.stringify({ user, carro }),
            headers: new Headers({ "content-type": "application/json" }),
          }),
        2000
      );
    }
  }, [carro, user, isLoading, isAuthenticated]);

  // add Width y Height
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
      dispatch(addWidthAndHeight(windowSize));
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [dispatch, windowSize]);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  // Fin add Width y Height

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detalles/:id" element={<Detalles />} />
        <Route path="/MetaMaskStatus/:id" element={<MetaMaskStatus />} />
        <Route path="/addItem" element={<AddArticle />} />
        <Route path="/successBuy" element={<SuccessPurchase />} />
        <Route path="/addItem" element={<AddArticle />} />
      </Routes>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default App;
