import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { cleanCart } from "../../redux/slices/cartSlice";
export default function SuccessPurchase() {
  const [searchParams] = useSearchParams();

  const payment_id = searchParams.get("payment_id");

  const dispatch = useDispatch();
  const [comprado, setComprado] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/mercadoPago/checkPurchase/${payment_id}`, {
      method: "GET",
    })
      .then((a) => a.json())
      .then((a) => {
        if (a.estado === "approved") {
          dispatch(cleanCart());
          setComprado(a.compra);
        } else {
          window.location.href = "http://localhost:3001/cart";
        }
      });
  }, [dispatch, payment_id]);

  console.log(comprado);
  return <div>Usa la variable comprado para mostrar los items que compraste satisfactoriamente y que ya se encuentran en tu historial de compras no te porcupes si salio mal la venta te redirije al carrito</div>;
}
