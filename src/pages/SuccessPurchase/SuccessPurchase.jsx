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
    fetch(`https://pf-30b-backend-production.up.railway.app/mercadoPago/checkPurchase/${payment_id}`, {
      method: "GET",
    })
      .then((a) => a.json())
      .then((a) => {
        if (a.estado === "approved") {
          dispatch(cleanCart());
          setComprado(a.compra);
        } else {
          window.location.href = "https://pf-30b-backend-production.up.railway.app/cart";
        }
      });
  }, [dispatch, payment_id]);

  //
  // http://localhost:3000/?code=Xep4229JPIupKAWhZPIpJ7c5Z2u4vQYR8_BSN7iUEDJGW&state=bWFfWlk4OUI3U183SUJ5aFpRU1V3MVhKcXhJREJHaVoyYjE5SXBMan5nVA%3D%3D
  //

  //ese link es un ejemplo lo pueden usar para guiarse de como seria una compra finalizada (miren consola al entrar al link)
  console.log(comprado);
  return <div>Usa la variable comprado para mostrar los items que compraste satisfactoriamente y que ya se encuentran en tu historial de compras no te porcupes si salio mal la venta te redirije al carrito</div>;
}
