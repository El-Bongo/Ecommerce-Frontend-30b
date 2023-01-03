import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanCart } from "../../redux/slices/cartSlice";
import Approved from "./Approved.png";
import styles from "./SuccessPurchase.module.scss";

export default function Detalles() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [comprado, setComprado] = useState([]);

  useEffect(() => {
    function checkStatus() {
      fetch("https://pf-30b-backend.onrender.com/metaMask/checkPurchase/" + id, { method: "GET" })
        .then((dataJson) => dataJson.json())
        .then((data) => {
          setDetails(data);
          setComprado(data.factura);
          if (data.result.status === "") {
            setTimeout(() => checkStatus(), 10000);
          } else {
            if (data.result.status === "1") {
              dispatch(cleanCart());
            }
          }
        });
    }
    checkStatus();
  }, [id, dispatch]);

  console.log(details);

  return (
    <div className={styles.SPContainer}>
      <div className={styles.approvedImgContainer}>{details.result?.status === "1" ? <img src={Approved} alt="Not Found" width={100} /> : null}</div>
      {details.result?.status === "1" ? (
        <h3>"Transaccion exitosa su compra sera despachada en breve"</h3>
      ) : details.result?.status === "" ? (
        <h3> "Su transaccion se encuentra en proceso, sera notificado cuando sea procesada"</h3>
      ) : (
        <h3>"Fallo la transaccion reintente la compra"</h3>
      )}

      {comprado.length === 0 ? (
        <h1>Cargando detalles de compra...</h1>
      ) : (
        comprado.articles?.map((c) => (
          <div className={styles.SPproductContainer} key={c.id}>
            <div className={styles.SPproduct}>
              <div className={styles.SPproductImgContainer}>
                <img src={c.images[0]} alt="" width={70} />
              </div>
              <span>{c.title}</span>
            </div>
            <div className={styles.SPinfoCartContainer} style={{ flex: 6, display: "flex" }}>
              <h4 className={styles.SPproductQuantity}>X {c.billitems.quantity}</h4>
              {/* <span className={styles.SPproductSubtotal}>${c.price}</span> */}
            </div>
          </div>
        ))
      )}
      <h1>Total ${comprado.total}</h1>
      <h3>El codigo de esta compra es: {comprado.transaction_id}</h3>
    </div>
  );
}
