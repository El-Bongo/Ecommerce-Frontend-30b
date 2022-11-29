import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../../redux/slices/cartSlice";
import Article from "../../components/Article/Article";
import { useMercadopago } from "react-sdk-mercadopago";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { mercadoPagoHook } from "../../hooks/mercadoPago";
import { metaHookARSandETH } from "../../hooks/metaHooks";
import { handleMetaPayment } from "../../hooks/metaHooks";

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
      mercadoPagoHook(carro, user, mercadopago);

      //Esta chanchada no solia ser necesario no se si cambio algo de mercado pago, en mi otro proyecto no se duplicaba el boton de comprar
      //por ahora funciona lo arreglare si no encuentro nada mas importante

      var element = document.querySelector("#cho-container");
      var child = element.lastElementChild;
      while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
      }
    }

    metaHookARSandETH(setARS, setETH);
  }, [mercadopago, carro, user, isAuthenticated, isLoading]);

  return (
    <div>
      <button onClick={() => dispatch(cleanCart())}>Vaciar Carro</button>

      <div id="cho-container" />

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
          <button onClick={() => handleMetaPayment(ethereum, ethers, carro, user.email, ARS, ETH)}>Pagar</button>
        </div>
      ) : null}

      {carro.map((x) => (
        <Article data={x} key={x.title + x.id} />
      ))}
    </div>
  );
}
