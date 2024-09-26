import { createRoot } from "react-dom/client";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

// Crear el root
const root = createRoot(document.getElementById("root"));

// Renderizar el componente dentro del Provider
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
