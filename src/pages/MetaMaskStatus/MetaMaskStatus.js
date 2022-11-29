import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanCart } from "../../redux/slices/cartSlice";

export default function Detalles() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    function checkStatus() {
      fetch("https://pf-30b-backend-production.up.railway.app/metaMask/checkPurchase/" + id, { method: "GET" })
        .then((dataJson) => dataJson.json())
        .then((data) => {
          setDetails(data);
          if (data.result.status === "") {
            setTimeout(() => checkStatus(), 10000);
          } else {
            if (data.results.status === "1") {
              dispatch(cleanCart());
            }
          }
        });
    }
    checkStatus();
  }, [id, dispatch]);

  return (
    <div>
      {details.result?.status === "1"
        ? "Transaccion exitosa su compra sera despachada en breve"
        : details.result?.status === ""
        ? "Su transaccion se encuentra en el bloque, cuando sea confirmada su compra sera despachada"
        : "Fallo la transaccion reintente la compra"}
    </div>
  );
}
