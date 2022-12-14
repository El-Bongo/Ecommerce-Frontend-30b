import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { cleanCart } from "../../redux/slices/cartSlice";
import Approved from "./Approved.png";
import styles from "./SuccessPurchase.module.scss";
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
          window.location.href = "https://ecommerce-frontend-30b.vercel.app/cart";
        }
      });
  }, [dispatch, payment_id]);

  return (
    <div className={styles.SPContainer}>
      <div className={styles.approvedImgContainer}>
        <img src={Approved} alt="Not Found" width={100} />
      </div>
      <h3>¡Compra realizada con éxito!</h3>
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
