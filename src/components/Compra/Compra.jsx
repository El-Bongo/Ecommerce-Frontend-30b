import mp from "../../assets/mercadopago.jpg";
import mm from "../../assets/MetaMask_Fox.svg.png";
import "./Compra.css";
import { Link } from "react-router-dom";

export default function Compras({ datos }) {
  return (
    <Link to={datos.payment_method === "MetaMask" ? "/MetaMaskStatus/" + datos.id : "/successBuy?payment_id=" + datos.transaction_id} className="compra_cotenedor_general">
      <img src={datos.payment_method === "MetaMask" ? mm : mp} alt="metodo_de_pago" className="compra_medio_pago"></img>
      <p>{datos.updatedAt.split("T")[0]}</p>
      <p>Total: {datos.total}</p>
      <p> {datos.payment_status === "approved" ? "Pago Recibido" : "Pago no recibido"}</p>
    </Link>
  );
}
