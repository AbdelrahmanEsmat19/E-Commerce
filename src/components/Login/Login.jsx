import { useContext, useEffect, useState } from "react";
import classes from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {Helmet} from "react-helmet";

export default function Login() {
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { setUserToken } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  async function handleLogin(values) {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      if (data.message === "success") {
        setUserToken(data.token);
        localStorage.setItem("userToken", data.token);
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-xl mx-auto my-14 lg:my-0">
        <h1 className="mb-5 text-3xl font-bold">Login:</h1>
        <div>
          {error && (
            <div className="bg-red-300 p-2 text-black mb-6">{error}</div>
          )}
        </div>
        <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your email
            </label>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 font-bold text-left">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <Helmet>

<meta charSet="utf-8" />
<title>Login Page</title>
<link rel="canonical" href="http://mysite.com/example" />
</Helmet>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your password
            </label>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 font-bold text-left">
                {formik.errors.password}
              </div>
            ) : null}
            <button
              type="button"
              className="absolute right-0 top-0 mt-2 mr-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>

            <div className="mt-4">
              <p>
                Not a member ?{" "}
                <Link className="text-blue-500 underline" to={"/register"}>
                  Register
                </Link>{" "}
              </p>
            </div>
            <div className="mt-4">
              <Link className="text-blue-500 underline" to={"/forget-password"}>
                Forget your password ?
              </Link>
            </div>
          </div>

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="text-white btn"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
