import { despachar } from "../../../../redux/actions/index";

export default function OrdersAdmin({ data }) {
  return (
    <div>
      <div>
        <p>Fecha: {data.createdAt.split("T")[0]}</p> <p>Total: {data.total}</p> <p>Email: {data.user.email}</p>
      </div>
      <div>
        {data.articles.map((x) => (
          <div key={x.id}>
            {x.title} - {x.billitems.quantity} - {x.id}
          </div>
        ))}
      </div>
      <button onClick={() => despachar(data.id)}>Despachar</button>
    </div>
  );
}
