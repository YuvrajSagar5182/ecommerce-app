import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import classes from "./Navbar.module.css";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { loginUser } from "../../utils/FetchData";
import { useAuth } from "../../store/authContext/auth";

const Navbar = () => {
  const path = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginButtonHandler = (event) => {
    setShowLoginModal(true);
  };

  const backDropHandler = (event) => {
    if (!event.target.closest("#authentication-modal")) {
      setShowLoginModal(false);
    }
  };

  const logoutHandler = () => {
    logout();
    toast("Logged Out Successfully!!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    // console.log(formData);
    const resp = await loginUser(formData);
    if (resp.status) {
      login(resp.data, resp.email, resp.userID);
      toast("Logged In Successfully!!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Error in Logging In", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setShowLoginModal(false);
    setEmail("");
    setPassword("");
    navigate("/");
  };

  const cartItems = useSelector((state) => state.cart);
  return (
    <nav className=" bg-[#3f83f8] mb-6 border-gray-200 dark:bg-gray-900 fixed w-full z-50  top-0">
      <div className="container max-w-auto  flex flex-wrap items-center justify-between p-4">
        <Link to={""} className={`flex items-center `}>
          <img
            src="https://png.pngtree.com/png-clipart/20210826/ourlarge/pngtree-color-e-commerce-application-delivery-trailer-mobile-app-icon-png-image_3501963.jpg"
            className="h-8 mr-3 mix-blend-darken"
            alt="Logo"
          />
          <span className=" text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Yuvi's-Ecommerce
          </span>
        </Link>
        <div className=" flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search "
            aria-expanded="false"
            className="md:hidden bg-white text-gray-500 border border-blue-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none  focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="flex md:order-2">
            <Link to={path.pathname === "/cart" ? ".." : "/cart"}>
              <button
                type="button"
                className=" text-blue-700 bg-white h-11 md:h-10 border flex items-center  border-blue-700 hover:text-white hover:bg-[#3f83f8] hover:border-transparent focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 dark:text-blue-300 dark:border-blue-300 dark:hover:text-white dark:hover:bg-blue-800 dark:hover:border-transparent dark:focus:ring-blue-800">
                <i className="mr-3">
                  <PiShoppingCartSimpleFill />
                </i>
                {cartItems.totalQuantity}
              </button>
            </Link>
          </div>
          <div className=" ml-3 flex items-center md:order-2 ">
            {!isLoggedIn && (
              <button
                type="button"
                onClick={loginButtonHandler}
                className=" text-blue-700 bg-white border h-11 md:h-10 border-blue-700 hover:text-white hover:bg-[#3f83f8] hover:border-transparent focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:text-blue-300 dark:border-blue-300 dark:hover:text-white dark:hover:bg-blue-800 dark:hover:border-transparent dark:focus:ring-blue-800 flex items-center">
                <i className="mr-3">
                  <BiLogIn />
                </i>
                Login
              </button>
            )}
            {isLoggedIn && (
              <button
                type="button"
                onClick={logoutHandler}
                className=" text-blue-700 bg-white  border h-11 md:h-10 border-blue-700 hover:text-white hover:bg-[#3f83f8] hover:border-transparent focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:text-blue-300 dark:border-blue-300 dark:hover:text-white dark:hover:bg-blue-800 dark:hover:border-transparent dark:focus:ring-blue-800 flex items-center">
                <i className="mr-2">
                  <BiLogOut />
                </i>
                Logout
              </button>
            )}
            {showLoginModal && (
              <div
                className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
                onClick={backDropHandler}>
                <div
                  id="authentication-modal"
                  tabIndex="-1"
                  aria-hidden="false"
                  aria-modal="true"
                  role="dialog"
                  className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md  overflow-x-hidden overflow-y-auto">
                  <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg dark:bg-gray-700">
                      <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          setShowLoginModal(false);
                        }}>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="false"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                      <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                          Sign in to our platform
                        </h3>
                        <form
                          className="space-y-6"
                          onSubmit={formSubmitHandler}>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              placeholder="name@gmail.com"
                              value={email}
                              onChange={emailHandler}
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your password
                            </label>
                            <input
                              type="password"
                              id="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={passwordHandler}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              required
                            />
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="remember"
                                  type="checkbox"
                                  value=""
                                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                />
                              </div>
                              <label
                                htmlFor="remember"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Remember me
                              </label>
                            </div>
                            <Link
                              to={""}
                              onClick={() => {
                                setShowLoginModal(false);
                              }}
                              className="text-sm text-blue-700 hover:underline hover:text-blue-700 dark:text-blue-500">
                              Lost Password?
                            </Link>
                          </div>
                          <button
                            type="submit"
                            data-modal-hide="authentication-modal"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <Link to={"/"}>Login to your account</Link>
                          </button>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <Link
                              to={"/signup"}
                              onClick={() => {
                                setShowLoginModal(false);
                              }}
                              className="text-blue-700 hover:underline hover:text-blue-700 dark:text-blue-500">
                              Create account
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative hidden md:block mr-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 bg-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full md:h-10 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 bg-white"
            aria-controls="navbar-search"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search">
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-[#3f83f8] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to={""}
                className={`text-white block font-light py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                ${path.pathname === "/" ? classes.active : undefined}`}
                aria-current="page"
                end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/products"}
                className={` text-white block font-light py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                ${path.pathname === "/products" ? classes.active : undefined}`}
                aria-current="page"
                end>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/about"}
                className={` text-white block font-light py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                ${path.pathname === "/about" ? classes.active : undefined}`}
                end>
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contact"}
                className={` text-white block font-light py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                ${path.pathname === "/contact" ? classes.active : undefined}`}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
