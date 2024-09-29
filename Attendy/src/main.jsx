import { createRoot } from "react-dom/client";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
