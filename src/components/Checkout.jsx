import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { checkoutUser } from "../store/cart-actions";
import { useAuth } from "../store/authContext/auth";
import { toast } from "react-toastify";

const EmptyCart = () => {
  return (
    <div className="container mt-16">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h4 className="text-2xl font-semibold mb-4">Your Cart is Empty</h4>
          <Link
            to="/products"
            className="text-white bg-blue-500 py-2 px-4 rounded flex items-center">
            <i className=" mr-2">
              <FiArrowLeftCircle />
            </i>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

const ShowCheckout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [subtotal, setSubtotal] = useState(0);
  const shipmentCharges = 10.0;
  const [totalItems, setTotalItems] = useState(0);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { isLoggedIn } = useAuth();

  const countryRef = useRef("");
  const stateRef = useState("");

  useEffect(() => {
    let calculatedSubtotal = 0;
    let calculatedTotalItems = 0;

    cart.items.forEach((item) => {
      calculatedSubtotal += item.price * item.quantity;
      calculatedTotalItems += item.quantity;
    });

    setSubtotal(calculatedSubtotal);
    setTotalItems(calculatedTotalItems);
  }, [cart.items]);

  const fnameHandler = (event) => {
    setFname(event.target.value);
  };
  const lnameHandler = (event) => {
    setLname(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const address1Handler = (event) => {
    setAddress1(event.target.value);
  };
  const address2Handler = (event) => {
    setAddress2(event.target.value);
  };

  const handlecountryChange = (event) => {
    countryRef.current = event.target.value;
  };
  const handlleStateChange = (event) => {
    stateRef.current = event.target.value;
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = {
      FirstName: fname,
      LastName: lname,
      email: email,
      Address: address1,
      BackUpAddress: address2,
      country: countryRef.current,
      State: stateRef.current,
    };

    if (isLoggedIn) {
      const userID = localStorage.getItem("id");
      await dispatch(checkoutUser(formData, userID));
    }
    if (!isLoggedIn) {
      const userID = localStorage.getItem("new_user");
      // console.log("NEW USER ID", userID, typeof userID);

      if (userID || userID !== "undefined" || userID !== "null") {
        await dispatch(checkoutUser(formData, userID));
      }
    }
    toast("Checked Out Successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setEmail("");
    setFname("");
    setLname("");
    setAddress1("");
    setAddress2("");
  };

  return (
    <>
      <div className="container mt-24 md:mt-20 mx-auto sm:px-4 py-5 ">
        <div className="flex flex-wrap justify-between my-4">
          <div className=" w-full md:w-2/5 pr-4 pl-4 lg:w-1/3  order-md-last">
            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-4">
              <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 ">
                <h5 className="mb-0 font-bold text-lg">Order Summary</h5>
              </div>
              <div className="flex-auto p-6">
                <ul className="flex flex-col pl-0 mb-0 border rounded border-gray-300 ">
                  <li className="relative  py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-center  pb-4">
                    Products ({totalItems})<span>${subtotal.toFixed(2)}</span>
                  </li>
                  <li className="relative  py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-center pb-4">
                    Shipping Charges
                    <span>${shipmentCharges.toFixed(2)}</span>
                  </li>
                  <li className="relative  py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-center">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>
                        ${(subtotal + shipmentCharges).toFixed(2)}
                      </strong>
                    </span>
                  </li>
                </ul>
                <Link
                  to="/cart"
                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-gray-900 text-white hover:bg-gray-900  hover:text-slate-50 py-3 px-4 leading-tight text-xl md:block w-full">
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 pr-4 pl-4 lg:w-2/3 ">
            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-4">
              <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 ">
                <h4 className="mb-0 font-bold text-lg">Billing address</h4>
              </div>
              <div className="flex-auto p-6">
                <form
                  onSubmit={formSubmitHandler}
                  autoComplete="on"
                  className="needs-validation">
                  <div className="flex flex-wrap  g-3">
                    <div className="sm:w-1/2  pr-4 my-1">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        id="firstName"
                        placeholder="First Name"
                        value={fname}
                        onChange={fnameHandler}
                        required
                      />
                      <div className="hidden mt-1 text-sm text-red">
                        Valid first name is required.
                      </div>
                    </div>

                    <div className="sm:w-1/2 my-1">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        id="lastName"
                        placeholder="Last Name"
                        value={lname}
                        onChange={lnameHandler}
                        required
                      />
                      <div className="hidden mt-1 text-sm text-red">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="w-full my-1">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        id="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={emailHandler}
                        required
                      />
                      <div className="hidden mt-1 text-sm text-red">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>

                    <div className="w-full my-1">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        id="address"
                        placeholder="1234 Main St"
                        value={address1}
                        onChange={address1Handler}
                        required
                      />
                      <div className="hidden mt-1 text-sm text-red">
                        Please enter your shipping address.
                      </div>
                    </div>

                    <div className="w-full">
                      <label htmlFor="address2" className="form-label">
                        Address 2
                        <span className="text-gray-700">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        id="address2"
                        value={address2}
                        onChange={address2Handler}
                        placeholder="Apartment or suite"
                      />
                    </div>

                    <div className="md:w-2/5 pr-4  my-1">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <br />
                      <select
                        className="form-select rounded-lg border-gray-300"
                        id="country"
                        onChange={handlecountryChange}
                        required>
                        <option defaultValue="">Choose...</option>
                        <option value={"Pakistan"}>Pakistan</option>
                      </select>
                      <div className="hidden mt-1 text-sm text-red">
                        Please select a valid country.
                      </div>
                    </div>

                    <div className="md:w-1/3 pr-4 pl-4 my-1">
                      <label htmlFor="state" className="form-label ">
                        State
                      </label>
                      <br />
                      <select
                        className="form-select rounded-lg border-gray-300"
                        id="state"
                        onChange={handlleStateChange}
                        required>
                        <option defaultValue="">Choose...</option>
                        <option value={"Punjab"}>Punjab</option>
                        <option value={"Sindh"}>Sindh</option>
                      </select>
                      <div className="hidden mt-1 text-sm text-red">
                        Please provide a valid state.
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3 text-xl font-bold text-slate-600">
                    Payment
                  </h4>

                  <div className="flex flex-col ml-3">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="cash"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="cash" className="ml-2">
                        Cash on Delivery
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="card" className="ml-2">
                        By Card
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-wrap  gy-3">
                    {paymentMethod === "card" && (
                      <>
                        <div className="md:w-1/2 pr-4 pl-4">
                          <label htmlFor="cc-name" className="form-label">
                            Name on card
                          </label>
                          <input
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="cc-name"
                            placeholder=""
                            required
                          />
                          <small className="text-gray-700">
                            Full name as displayed on card
                          </small>
                          <div className="hidden mt-1 text-sm text-red">
                            Name on card is required
                          </div>
                        </div>

                        <div className="md:w-1/2 pr-4 pl-4">
                          <label htmlFor="cc-number" className="form-label">
                            Credit card number
                          </label>
                          <input
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="cc-number"
                            placeholder=""
                            required
                          />
                          <div className="hidden mt-1 text-sm text-red">
                            Credit card number is required
                          </div>
                        </div>

                        <div className="w-fit md:w-1/2 pr-4 pl-4">
                          <label
                            htmlFor="cc-expiration"
                            className="w-fit form-label">
                            Expiration
                          </label>
                          <input
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="cc-expiration"
                            placeholder=""
                            required
                          />
                          <div className="hidden mt-1 text-sm text-red">
                            Expiration date required
                          </div>
                        </div>

                        <div className="md:w-1/4 pr-4 pl-4">
                          <label htmlFor="cc-cvv" className="form-label">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="cc-cvv"
                            placeholder=""
                            required
                          />
                          <div className="hidden mt-1 text-sm text-red">
                            Security code required
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <hr className="my-4" />

                  <button
                    className="w-full bg-gray-900 text-white hover:bg-gray-900  hover:text-slate-50 hover:font-bold  inline-block align-middle text-center select-none border font-normal whitespace-no-wrap  leading-normal no-underline
                    px-8 py-3 rounded-lg focus:outline-none
                    "
                    type="submit">
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="container my-3 py-3">
      <h1 className="text-center font-bold text-xl pb-2">Checkout</h1>
      <hr />
      {cart.items.length > 0 ? <ShowCheckout /> : <EmptyCart />}
    </div>
  );
};

export default Checkout;
