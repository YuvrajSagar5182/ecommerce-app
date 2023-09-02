import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';
import '../node_modules/flowbite/dist/flowbite.js'
import { AuthProvider } from "./store/authContext/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <StrictMode>
      <Provider store={store}>
        <App />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </Provider>
    </StrictMode>
  </AuthProvider>
);