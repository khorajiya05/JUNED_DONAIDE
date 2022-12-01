import { NotificationContainer } from "react-notifications";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";

import "react-notifications/lib/notifications.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import 'react-phone-number-input/style.css'
import "react-toastify/dist/ReactToastify.css";

import store, { persistor } from '../src/ReduxStore/store';
import AppRouter from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

let App = () => {

  return (
    <Provider store={store}>
      <ToastContainer autoClose={3000} limit={1} />
      <NotificationContainer />
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
