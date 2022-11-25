import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../../redux/slices/cartSlice";
import Article from "../../components/Article/Article";
import { useMercadopago } from "react-sdk-mercadopago";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";

export default function Cart() {
  const carro = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const mercadopago = useMercadopago.v2("TEST-4d76826e-3115-416c-bc70-f7a46fa75820", {
    locale: "es-AR",
  });
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const { user, isAuthenticated, isLoading } = useAuth0();

  const [ARS, setARS] = useState(99999);
  const [ETH, setETH] = useState(99999);

  useEffect(() => {
    if (carro.length > 0 && !isLoading && isAuthenticated) {
      fetch("http://localhost:3001/mercadoPago/createOrder", { method: "POST", body: JSON.stringify({ carro, user: user }), headers: new Headers({ "content-type": "application/json" }) })
        .then((dataJson) => dataJson.json())
        .then((data) => {
          if (mercadopago) {
            mercadopago.checkout({
              preference: {
                id: data.id,
              },
              render: {
                container: ".cho-container",
                label: "Comprar",
              },
            });
          }
        });
    }
    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales", { method: "GET", headers: new Headers({ "content-type": "application/json" }) })
      .then((data) => data.json())
      .then((answer) => setARS(answer[1].casa.venta));

    fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT", { method: "GET" })
      .then((data) => data.json())
      .then((answer) => setETH(answer.price));
  }, [mercadopago, carro, user, isAuthenticated, isLoading]);

  const etherToPay = (carro.reduce((a, b) => a + b.price * b.quantity, 0) / parseFloat(ARS) / parseFloat(ETH)).toFixed(8);

  async function handleMetaPayment() {
    const transactionParameters = {
      to: "0xBAE283dDb48cD93002861647B9f8b32FcF6943B4", // Required except during contract publications.
      from: ethereum.selectedAddress, // must match user's active address.
      value: ethers.utils.parseEther(etherToPay.toString())._hex, // Only required to send ether to the recipient from the initiating external account.
      chainId: "0x5", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };

    const txHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    if (!txHash.message) {
      fetch("http://localhost:3001/metaMask/createOrder", { method: "POST", body: JSON.stringify({ txHash: txHash, carro, email: user.email }), headers: new Headers({ "content-type": "application/json" }) })
        .then((data) => data.json())
        .then((answer) => (window.location.href = "http://localhost:3000/MetaMaskStatus/" + answer.id));
    }
  }

  return (
    <div>
      <button onClick={() => dispatch(cleanCart())}>Vaciar Carro</button>
      <div className="cho-container" />

      {status === "initializing" ? (
        <div>Synchronisation with MetaMask ongoing...</div>
      ) : status === "unavailable" ? (
        <div>Descarga MetaMask para pagar con Crypto</div>
      ) : status === "notConnected" ? (
        <button onClick={connect}>Connect to MetaMask</button>
      ) : status === "connecting" ? (
        <div>Connecting...</div>
      ) : status === "connected" ? (
        <div>
          Connected account {account} on chain ID {chainId}
          <button onClick={() => handleMetaPayment()}>Pagar</button>
        </div>
      ) : null}

      {carro.map((x) => (
        <Article data={x} key={x.title + x.id} />
      ))}
    </div>
  );
}
