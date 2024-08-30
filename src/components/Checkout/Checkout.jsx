import { useContext, useState } from "react";
import classes from "./Checkout.module.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const navigate = useNavigate();

  const { getPayment, cartId, RemoveAllCart, setnumOfCartItems } =
    useContext(CartContext);
  const [isOnline, setIsOnline] = useState(false);
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleCheckout,
  });

  async function handleCheckout(values) {
    const url = isOnline
      ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://abdelrahmanesmat19.github.io/E-Commerce`
      : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    const res = await getPayment(url, values);

    if (res.status === "success") {
      if (isOnline) {
        window.location.href = res.session.url;
      } else {
        toast.success("Payment done successfuly");
        setnumOfCartItems(0);
        RemoveAllCart();
        setTimeout(() => {
          navigate("/allorders");
        }, 3000);
      }
    } else {
      console.error("Payment failed:", res);
      toast.error("Payment failed. Please try again.");
    }
  }

  return (
    <>
      <div className="max-w-xl mx-auto my-10 ">
        <h1 className="mb-5 text-3xl font-bold">Checkout:</h1>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Checkout Page</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative  z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              required
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your details
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              required
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your city
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isOnline"
              onChange={() => setIsOnline(!isOnline)}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="isOnline"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Pay With Visa
            </label>
          </div>

          <button
            type="submit"
            className={`text-white ${
              isOnline ? "bg-blue-600" : "bg-orange-600"
            } hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-sm font-medium rounded-lg px-5 py-2.5`}
          >
            {isOnline ? "Pay With Visa" : "Pay Cash"}
          </button>
        </form>
      </div>
    </>
  );
}
