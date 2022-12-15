import Products from "./pages/Products/Products";
import { Route, Routes, useLocation } from "react-router-dom";
import { localStorageCart } from "./redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import Detalles from "./pages/Detalles/Detalles";
import EditReview from "./pages/EditReview/EditReview";
import ReportReview from "./pages/ReportReview/ReportReview";
import DeleteReviews from "./pages/DeleteReviews/DeleteReviews";
import Favorites from "./pages/Favorites/Favorites";
import AddArticle from "./pages/AddArticle/AddArticle";
import SuccessPurchase from "./pages/SuccessPurchase/SuccessPurchase";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.module.scss";
import MetaMaskStatus from "./pages/MetaMaskStatus/MetaMaskStatus";
import { Home } from "./pages/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { BottomNav } from "./components/BottomNavigation/BottomNav";
import { addWidthAndHeight } from "./redux/slices/windowSlice";
import Profile from "./pages/Profile/Profile";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound/NotFound";
import { inputUserData } from "./redux/slices/userSlice";
import Checkout from "./components/CheckOut/Checkout";

//MercadoPago
import { useMercadopago } from "react-sdk-mercadopago";
import { RutasProtegidas } from "./components/RutasProtegidas/RutasProtegidas";
import { Dashboard } from "./pages/Dashboard/home/Dashboard";
import { DUsers } from "./pages/Dashboard/users/DUsers";
import { DSingleUser } from "./pages/Dashboard/SingleUser/DSingleUser";
import Orders from "./pages/Dashboard/Orders/Orders";
import { persist } from "./redux/slices/darkmodeSlice";
import { Perfil } from "./pages/Dashboard/Perfil/Perfil";
import { DBottomNav } from "./pages/Dashboard/components/BottomNavDashboard/DBottomNav";
import { DEditUser } from "./pages/Dashboard/EditUser/DEditUSer";
import { DProducts } from "./pages/Dashboard/products/DProducts";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DSingleProduct } from "./pages/Dashboard/SigleProduct/DSigleProduct";
import { DEditProduct } from "./pages/Dashboard/EditProduct/DEditProduct";
import { DCreateProduct } from "./pages/Dashboard/CreateProduct/DCreateProduct";

function App() {
  const dispatch = useDispatch();
  const carro = useSelector((state) => state.cart.cartItems);
  const { darkMode } = useSelector((state) => state.darkmode);
  const [peticion, setPeticion] = useState(false);
  const [sentCarro, setSentCarro] = useState(carro);
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const userRole = useSelector((state) => state.user.data.role);

  // eslint-disable-next-line
  const mercadopago = useMercadopago.v2("TEST-4d76826e-3115-416c-bc70-f7a46fa75820", {
    locale: "es-AR",
  });

  // Persistencia del DarkMode
  useEffect(() => {
    dispatch(persist(JSON.parse(localStorage.getItem("darkMode"))));
  }, [darkMode, dispatch]);

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
      })
        .then((answer) => answer.json())
        .then((data) => {
          if (data.deletedAt) {
            logout();
          } else dispatch(inputUserData(data));
        })
        .then(() =>
          fetch("http://localhost:3001/cart/getCart", {
            method: "POST",
            body: JSON.stringify({ user }),
            headers: new Headers({ "content-type": "application/json" }),
          })
            .then((answer) => answer.json())
            .then((data) => {
              data.articles.length > 0
                ? dispatch(
                    localStorageCart(
                      data.articles.map((x) => {
                        return { ...x, quantity: x.itemEnCarro.quantity };
                      })
                    )
                  )
                : dispatch(localStorageCart(JSON.parse(window.localStorage.getItem("cart"))));
            })
        );
    }
  }, [isLoading, isAuthenticated, user, dispatch]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (!peticion && carro !== sentCarro) {
        setSentCarro(carro);
        fetch("http://localhost:3001/cart/updateCart", {
          method: "POST",
          body: JSON.stringify({ user, carro }),
          headers: new Headers({ "content-type": "application/json" }),
        })
          .then((answer) => {
            toast.success("Carro Actualizado!");
            setPeticion(false);
            return answer.json();
          })
          .then((data) => data)
          .catch((e) => toast.error("Error actualizando el carro."));
      }
    }
  }, [carro, user, isLoading, isAuthenticated, peticion, sentCarro]);

  // add Width y Height

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(addWidthAndHeight({ innerWidth: window.innerWidth }));
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [dispatch]);

  // Fin add Width y Height

  if (useLocation().pathname.split("/")[1] !== "admin" || userRole === "client")
    return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/detalles/:id" element={<Detalles />} />
          <Route path="/review/:idReview" element={<EditReview />} />
          <Route path="/report/:idReview" element={<ReportReview />} />
          <Route path="/MetaMaskStatus/:id" element={<MetaMaskStatus />} />
          <Route path="/addItem" element={<AddArticle />} />
          <Route path="/successBuy" element={<SuccessPurchase />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
        <BottomNav />

        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    );
  else
    return (
      <div>
        <Routes>
          <Route element={<RutasProtegidas />}>
            <Route path="/admin">
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Perfil />} />
              <Route path="reportedReviews" element={<DeleteReviews />} />
              <Route path="users">
                <Route index element={<DUsers />} />
                <Route path="edit/:userId" element={<DEditUser />} />
                <Route path=":userId" element={<DSingleUser />} />
              </Route>
              <Route path="products">
                <Route index element={<DProducts />} />
                <Route path="new" element={<DCreateProduct />} />
                <Route path=":productId" element={<DSingleProduct />} />
                <Route path="edit/:productId" element={<DEditProduct />} />
              </Route>
            </Route>
          </Route>
          <Route path="/admin/ordenes" element={<Orders />}></Route>
        </Routes>
        <DBottomNav />
      </div>
    );
}

export default App;
