import Products from "./pages/Products/Products";
import { Route, Routes } from "react-router-dom";
import { localStorageCart } from "./redux/slices/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import Detalles from "./pages/Detalles/Detalles";
import AddArticle from "./pages/AddArticle/AddArticle";
import SuccessPurchase from "./pages/SuccessPurchase/SuccessPurchase";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.module.scss";
import MetaMaskStatus from "./pages/MetaMaskStatus/MetaMaskStatus";

function App() {
  const dispatch = useDispatch();
  const carro = useSelector((state) => state.cart.cartItems);

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      dispatch(localStorageCart(JSON.parse(window.localStorage.getItem("cart"))));
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
      fetch("http://localhost:3001/cart/updateCart", {
        method: "POST",
        body: JSON.stringify({ user, carro }),
        headers: new Headers({ "content-type": "application/json" }),
      });
    }
  }, [carro, user, isLoading, isAuthenticated]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detalles/:id" element={<Detalles />} />
        <Route path="/MetaMaskStatus/:id" element={<MetaMaskStatus />} />
        <Route path="/addItem" element={<AddArticle />} />
        <Route path="/successBuy" element={<SuccessPurchase />} />
        <Route path="/addItem" element={<AddArticle />} />
      </Routes>
    </div>
  );
}

export default App;
