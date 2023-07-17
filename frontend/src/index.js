import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import { positions, transitions, Provider as AlertProvider } from "react-alert"; */
/* import AlertTemplate from "react-alert-template-basic"; */

/* const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}; */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
   {/*  <AlertProvider template={AlertTemplate} {...options}> */}
      <App />
   {/*  </AlertProvider> */}
      <ToastContainer/>
    </BrowserRouter>
  </Provider>
);