export async function mercadoPagoHook(carro, user, mercadopago) {
  return fetch("https://ecommerce-frontend-30b.vercel.app/mercadoPago/createOrder", { method: "POST", body: JSON.stringify({ carro, user: user }), headers: new Headers({ "content-type": "application/json" }) })
    .then((dataJson) => dataJson.json())
    .then((data) => {
      if (mercadopago) {
        mercadopago.checkout({
          preference: {
            id: data.id,
          },
          render: {
            container: "#cho-container",
            label: "Comprar",
          },
        });
      }
    });
}
