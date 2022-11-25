import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detalles() {
  const { id } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/metaMask/checkPurchase/" + id, { method: "GET" })
      .then((dataJson) => dataJson.json())
      .then((data) => {
        setDetails(data);
      });
  }, [id]);

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
