import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store/ReduxMain.js";
import Template from "./components/template.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { ClerkProvider } from '@clerk/clerk-react'


// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById("root")).render(
  <StrictMode>

      <Provider store={store}>
      <PersistGate loading={"loading..."} persistor={persistor}>
    <Template>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
    </Template>
      </PersistGate>
      </Provider>
  </StrictMode>
);
