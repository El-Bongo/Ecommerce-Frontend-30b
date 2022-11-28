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

function App() {
  const dispatch = useDispatch();
  const carro = useSelector((state) => state.cart.cartItems);
  const [peticion, setPeticion] = useState(false);
  const [sentCarro, setSentCarro] = useState(carro);

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      dispatch(localStorageCart(JSON.parse(window.localStorage.getItem("cart"))));
    }
  }, [dispatch, isLoading, isAuthenticated]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetch("https://pf-30b-backend-production.up.railway.app/users/checkGoogleFacebook", {
        method: "POST",
        body: JSON.stringify(user),
        headers: new Headers({ "content-type": "application/json" }),
      }).then(() =>
        fetch("https://pf-30b-backend-production.up.railway.app/cart/getCart", {
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
      if (!peticion && carro !== sentCarro) {
        console.log("envie una");

        setSentCarro(carro);
        fetch("https://pf-30b-backend-production.up.railway.app/cart/updateCart", {
          method: "POST",
          body: JSON.stringify({ user, carro }),
          headers: new Headers({ "content-type": "application/json" }),
        }).then(() => {
          setPeticion(false);
          console.log("termino una");
        });
      }
    }
  }, [carro, user, isLoading, isAuthenticated, peticion, sentCarro]);

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
      <Footer/>
    </div>
  );
}

export default App;
