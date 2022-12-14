import { useDispatch, useSelector } from "react-redux";
import { cleanCart, cleanItem } from "../../redux/slices/cartSlice";
import { useMercadopago } from "react-sdk-mercadopago";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { mercadoPagoHook } from "../../hooks/mercadoPago";
import { metaHookARSandETH } from "../../hooks/metaHooks";
import { handleMetaPayment } from "../../hooks/metaHooks";
import styles from "./Cart.module.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export default function Cart() {
  const carro = useSelector((state) => state.cart.cartItems);
  const [value, setValue] = useState("mp");
  const dispatch = useDispatch();
  const mercadopago = useMercadopago.v2(
    "TEST-4d76826e-3115-416c-bc70-f7a46fa75820",
    {
      locale: "es-AR",
    }
  );
  // eslint-disable-next-line
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    // <div>
    //   <button onClick={() => dispatch(cleanCart())}>Vaciar Carro</button>

    //   <div id="cho-container" />

    //   {status === "initializing" ? (
    //     <div>Synchronisation with MetaMask ongoing...</div>
    //   ) : status === "unavailable" ? (
    //     <div>Descarga MetaMask para pagar con Crypto</div>
    //   ) : status === "notConnected" ? (
    //     <button onClick={connect}>Connect to MetaMask</button>
    //   ) : status === "connecting" ? (
    //     <div>Connecting...</div>
    //   ) : status === "connected" ? (
    //     <div>
    //       Connected account {account} on chain ID {chainId}
    //       <button
    //         onClick={() =>
    //           handleMetaPayment(ethereum, ethers, carro, user.email, ARS, ETH)
    //         }
    //       >
    //         Pagar
    //       </button>
    //     </div>
    //   ) : null}

    //   {carro.map((x) => (
    //     <Article data={x} key={x.title + x.id} />
    //   ))}
    // </div>

    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cartContainer}>
          <div className={styles.cartProducts}>
            <div className={styles.titlesContainer}>
              <h4>PRODUCTO</h4>
              <h4>PRECIO</h4>
              <h4>CANTIDAD</h4>
              <Button
                color="error"
                style={{ fontWeight: 600, fontFamily: 'inherit' }}
                onClick={() => dispatch(cleanCart())}
              >
                Vaciar Carrito
              </Button>
            </div>
            {carro.map((c) => (
              <div className={styles.productContainer} key={c.id}>
                <div className={styles.product}>
                  <div className={styles.productImgContainer}>
                    <img src={c.images[0]} alt="" width={70} />
                  </div>
                  <span>
                    {c.category.name + ' ' 
                    + c.properties.type + ' ' 
                    + c.properties.brand + ' ' 
                    + c.properties.model + ' '
                    + c.properties.size } 
                  </span>
                </div>
                <div
                  className={styles.infoCartContainer}
                  style={{ flex: 6, display: "flex" }}
                >
                  <span className={styles.productSubtotal}>${c.price}</span>
                  <input type="number" value={c.quantity} />
                  <HighlightOffIcon
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: 30,
                      flex: 3,
                    }}
                    onClick={() => dispatch(cleanItem(c.id))}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartTotal}>
            <h2>Total del Carrito</h2>
            <div className={styles.subtotal}>
              <h3>Subtotal</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {carro.map((c) => (
                  <span style={{ marginBottom: 5 }} key={c.id}>
                    ${c.price * c.quantity}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.total}>
              <h3>Total</h3>
              <span>
                $
                {carro.reduce(
                  (acumulador, currentValue) =>
                    acumulador +
                    Number(currentValue.price) * currentValue.quantity,
                  0
                )}
              </span>
            </div>
            <FormControl style={{ marginTop: 10, marginBottom: 10 }}>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                style={{ fontFamily: "inherit" }}
              >
                Metodo de pago
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="mp"
                  control={<Radio />}
                  label="Mercado Pago"
                />
                <FormControlLabel
                  value="meta"
                  control={<Radio />}
                  label="Metamask"
                />
              </RadioGroup>
            </FormControl>
            {/* <input type="button" value="Check Out" /> */}
            {carro.length !== 0 && (
              <div
                id="cho-container"
                style={{ display: value !== "mp" && "none" }}
              />
            )}

            {status === "initializing" ? (
              <h3>Synchronisation with MetaMask ongoing...</h3>
            ) : status === "unavailable" ? (
              <h3>Descarga MetaMask para pagar con Crypto</h3>
            ) : status === "notConnected" ? (
              <Button style={{fontFamily: "inherit"}} color="secondary" onClick={connect} variant="outlined">Connect to MetaMask</Button>
            ) : status === "connecting" ? (
              <div>Connecting...</div>
            ) : status === "connected" ? (
              <div>
                {/* Connected account {account} on chain ID {chainId} */}
                {carro.length !== 0 && value === "meta" && (
                  <Button
                    onClick={() =>
                      handleMetaPayment(
                        ethereum,
                        ethers,
                        carro,
                        user.email,
                        ARS,
                        ETH
                      )
                    }
                    variant="contained"
                    style={{ fontFamily: "inherit" }}
                  >
                    Pagar
                  </Button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
