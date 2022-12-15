export async function metaHookARSandETH(setARS, setETH) {
  fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales", { method: "GET", headers: new Headers({ "content-type": "application/json" }) })
    .then((data) => data.json())
    .then((answer) => setARS(answer[1].casa.venta));

  fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT", { method: "GET" })
    .then((data) => data.json())
    .then((answer) => setETH(answer.price));
}

export async function handleMetaPayment(ethereum, ethers, carro, email, ARS, ETH) {
  const transactionParameters = {
    to: "0xBAE283dDb48cD93002861647B9f8b32FcF6943B4", // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: ethers.utils.parseEther((carro.reduce((a, b) => a + b.price * b.quantity, 0) / parseFloat(ARS) / parseFloat(ETH)).toFixed(8).toString())._hex, // Only required to send ether to the recipient from the initiating external account.
    chainId: "0x5", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };

  const txHash = await ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  });
  if (!txHash.message) {
    fetch("https://pf-30b-backend-production.up.railway.app/metaMask/createOrder", { method: "POST", body: JSON.stringify({ txHash: txHash, carro, email }), headers: new Headers({ "content-type": "application/json" }) })
      .then((data) => data.json())
      .then((answer) => (window.location.href = "https://ecommerce-frontend-30b.vercel.app/MetaMaskStatus/" + answer.id));
  }
}
