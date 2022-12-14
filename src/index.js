import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Redux toolkit
import store from "./redux/store";
import { Provider } from "react-redux";

//React-Router v6
import { BrowserRouter } from "react-router-dom";

//Auth0
import { Auth0Provider } from "@auth0/auth0-react";

//MetaMask
import { MetaMaskProvider } from "metamask-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider domain="dev-i9a-0rdn.us.auth0.com" clientId="9HIGrB52CruBl6spzXBPV26gjlXiJP5i" redirectUri={window.location.origin}>
        <MetaMaskProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MetaMaskProvider>
      </Auth0Provider>
    </React.StrictMode>
  </Provider>
);
