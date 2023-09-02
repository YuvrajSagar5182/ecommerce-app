import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeftCircle, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);

  const EmptyCart = () => {
    return (
      <div className="flex justify-center items-center h-screen mt-20">
        <div className="text-center">
          <h4 className="text-2xl font-semibold mb-4">Your Cart is Empty</h4>
          <Link
            to="/"
            className="text-white bg-blue-500 py-2 px-4 rounded flex items-center">
            <i className=" mr-2">
              <FiArrowLeftCircle />
            </i>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  };

  const ShowCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const cart = useSelector((state) => state.cart);

    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    let shippingCharges = 10.0; //$ 10 -- shipping Charges
    let totalItems = cart.totalQuantity;

    const removeItemHandler = (id) => {
      dispatch(cartActions.removeItemFromCart(id));
      toast("An Item Removed From the Cart", {
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

    const addItemHandler = (item) => {
      dispatch(
        cartActions.addItemToCart({
          id: item._id,
          title: item.title,
          price: item.price,
          image: item.image,
        })
      );
      toast("An Item Added to the Cart", {
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

    return (
      <section className="h-full gradient-custom mt-20">
        <div className="container mx-auto sm:px-4 py-5">
          <div className="flex flex-wrap  justify-center my-4">
            <div className="md:w-2/3 pr-4 pl-4">
              <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-4">
                <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900">
                  <h5 className="mb-0 font-bold text-xl">Item List</h5>
                </div>
                <div className="flex-auto p-6">
                  {cart.totalQuantity > 0 &&
                    cartItems?.map((item) => {
                      return (
                        <div key={item._id}>
                          <div className="flex flex-wrap  items-center">
                            <div className="lg:w-1/4 pr-4 pl-4 md:w-full ">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="lg:w-2/5 pr-4 pl-4 pt-2 md:w-1/2 md:pr-4 md:pl-4 md:pt-0">
                              <p>
                                <strong>{item.title}</strong>
                              </p>
                            </div>

                            <div className="lg:w-1/3 pr-4 pl-4 md:w-1/2 md:pr-4 md:pl-4">
                              <div
                                className="flex mb-4 items-center"
                                style={{ maxWidth: "300px" }}>
                                <button
                                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline hover:bg-red-500 hover:text-white"
                                  onClick={() => {
                                    removeItemHandler(item._id);
                                  }}>
                                  <i className="">
                                    <FiMinus />
                                  </i>
                                </button>

                                <p className="mx-5 font-bold text-lg text-orange-700">
                                  {item.quantity}
                                </p>

                                <button
                                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline hover:bg-stone-500 hover:text-white"
                                  onClick={() => {
                                    addItemHandler(item);
                                  }}>
                                  <i className="">
                                    <FiPlus />
                                  </i>
                                </button>
                              </div>

                              <p className="text-start md:text-center">
                                <strong>
                                  <span className=" text-gray-500 pr-1">
                                    {item.quantity}
                                  </span>
                                  x ${item.price.toFixed(2)}
                                </strong>
                              </p>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            {cart.totalQuantity > 0 && (
              <div className="md:w-1/3 w-full pr-4 pl-4">
                <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-4">
                  <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900  ">
                    <h5 className="mb-0 font-bold text-xl">Order Summary</h5>
                  </div>
                  <div className="flex-auto p-6">
                    <ul className="flex flex-col pl-0 mb-0 border rounded border-gray-300 ">
                      <li className="relative py-3 px-6 border border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-center md:border-0 md:pb-0 md:mb-3">
                        Products ({totalItems})
                        <span>${subtotal.toFixed(2)}</span>
                      </li>
                      <li className="relative  py-3 px-6 border border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-center md:pb-4">
                        Shipping Charges
                        <span>${shippingCharges.toFixed(2)}</span>
                      </li>
                      <li className="relative mt-0  py-3 px-6 border border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-center md:border-0 md:pb-0 md:mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>
                            ${(subtotal + shippingCharges).toFixed(2)}
                          </strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-gray-900 text-white hover:bg-gray-900  hover:text-slate-50 py-3 px-4 leading-tight text-xl md:block w-full">
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="container mx-auto my-3 py-3">
      <h1 className="text-center text-3xl">Cart</h1>
      <hr className="my-2" />
      {cart.totalQuantity > 0 ? <ShowCart /> : <EmptyCart />}
    </div>
  );
};

export default Cart;
