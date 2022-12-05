import Compra from "../Compra/Compra";

export default function Compras({ facturas }) {
  return (
    <div>
      {facturas?.map((x) => (
        <Compra datos={x} />
      ))}
    </div>
  );
}
