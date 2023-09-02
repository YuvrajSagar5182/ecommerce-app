import Products from "./components/Products";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout";
import SignUp from "./components/SignUp";
import ErrorPage from "./pages/ErrorPage";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchForCartData, registerUser } from "./store/cart-actions";
import { useAuth } from "./store/authContext/auth";


import { createBrowserRouter, RouterProvider } from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage message={`OOPS! Something went wrong...`} />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <SignUp /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:productId', element: <ProductDetails /> }


    ]
  }
]);

const App = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isLoggedIn } = useAuth();

  useEffect(() => {

    const awaitRes = async () => {
      try {
        const runThunk = async (callback) => {
          callback()
        }

        const userID = localStorage.getItem('id');
        // console.log('userID', userID, typeof (userID));

        if (userID && userID !== 'undefined' && userID !== 'null') {
          await runThunk(() => dispatch(fetchForCartData(userID)));

        } else {
          const new_user_id = localStorage.getItem('new_user');
          // console.log('NEW USER ID', new_user_id, typeof (new_user_id));

          if (!new_user_id || new_user_id === "undefined" || new_user_id === "null") {

            const register = await dispatch(registerUser(new_user_id));
            localStorage.setItem('new_user', register?.user?._id);
          } else {
            await runThunk(() => dispatch(fetchForCartData(null)));

          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    awaitRes();
  }, [dispatch, isLoggedIn]);

  useEffect(() => {

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch, isLoggedIn]);

  return (

    <RouterProvider router={router} />
  );
}

export default App;
