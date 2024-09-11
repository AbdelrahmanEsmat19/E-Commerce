import { useContext, useState } from "react";
import classes from "./Checkout.module.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import * as Yup from "yup";

export default function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { getPayment, cartId, RemoveAllCart, setnumOfCartItems } =
    useContext(CartContext);
  const [isOnline, setIsOnline] = useState(false);
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyptian number")
      .required("Phone is required"),
    details: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "details must be alphabetic characters only")
      .required("Details are required"),
    city: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "city must be alphabetic characters only")
      .required("City is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleCheckout,
  });

  async function handleCheckout(values) {
    setLoading(true);
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
        }, 1000);
      }
    } else {
      console.error("Payment failed:", res);
      toast.error("Payment failed. Please try again.");
    }
    setLoading(false);
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
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your phone
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500">{formik.errors.phone}</div>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.details}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your details
            </label>
            {formik.errors.details && formik.touched.details && (
              <div className="text-red-500">{formik.errors.details}</div>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.city}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your city
            </label>
            {formik.errors.city && formik.touched.city && (
              <div className="text-red-500">{formik.errors.city}</div>
            )}
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
            } hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-sm font-medium rounded-lg px-5 py-2.5 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? (
              <i class="fas fa-spinner fa-spin"></i>
            ) : isOnline ? (
              "Pay With Visa"
            ) : (
              "Pay Cash"
            )}
            {loading ? "Loading..." : isOnline ? "" : ""}
          </button>
        </form>
      </div>
    </>
  );
}
