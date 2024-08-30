import { useState } from "react";
import classes from "./ForgetYourPassword.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function ForgetYourPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);
  const [resetCode, setResetCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function forgetPassword(email) {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      setSuccess(true);
      setStep(1);
      toast.success("The verification code sent successfully");
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }
  async function verifyResetCode(resetCode) {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      setVerified(true);
      setStep(2);
      setLoading(false);
      setError(false);

      toast.success("Verification code is correct!");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 0) {
      forgetPassword(email);
    } else if (step === 1) {
      verifyResetCode(resetCode);
    } else if (step === 2 && verified) {
      if (!passwordRegex.test(newPassword)) {
        setError(
          "Password must be at least 8 characters, First character capital contain at least one letter and one number"
        );
      } else {
        resetPassword();
      }
    }
  };
  async function resetPassword() {
    setLoading(true);
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email,
          newPassword,
        }
      );
      console.log(response);
      setSuccess(true);
      setLoading(false);
      toast.success("Password changed Successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <form className="max-w-xl mx-auto lg:my-0 my-16" onSubmit={handleSubmit}>
        {step === 0 ? (
          <>
            <h2 className="font-bold mb-3 text-center border p-3">
              Forgot Password :
            </h2>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your email
              </label>
              <p
                id="helper-text-explanation"
                class="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Please enter your Email.
              </p>
              {error && <p className="text-red-700">{error}</p>}
              {success && (
                <p className="text-green-600">
                  Password reset email sent successfully!
                </p>
              )}
              <Helmet>
                <meta charSet="utf-8" />
                <title>Forget Password </title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
              <button
                type="submit"
                class="text-white  end-2.5 bottom-2.5 mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  " Send Reset Code"
                )}
              </button>
            </div>
          </>
        ) : step === 1 ? (
          <>
            <h2 className="font-bold mb-3 text-center border p-3">
              Verification Code :
            </h2>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="Verification"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={resetCode}
                onChange={(event) => setResetCode(event.target.value)}
              />

              <label
                htmlFor="Verification"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Code
              </label>

              <Helmet>
                <meta charSet="utf-8" />
                <title>Verification Code </title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
              <p
                id="helper-text-explanation"
                class="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Please enter the verification code sent to your email.
              </p>
              {error && <p className="text-red-700">{error}</p>}
              <button
                type="submit"
                class="text-white  end-2.5 bottom-2.5 mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  " Verify"
                )}{" "}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-bold mb-3 text-center border p-3">
              Reset Password :
            </h2>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                disabled
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your email
              </label>

              <Helmet>
                <meta charSet="utf-8" />
                <title>Change Password </title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 mt-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 left-0 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter your new password
                </label>
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
                <p
                  id="helper-text-explanation"
                  class="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  Please enter your new password.
                </p>
                {error && <p className="text-red-700">{error}</p>}

                <button
                  type="submit"
                  class="text-white  end-2.5 bottom-2.5 mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Change Passwordy"
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
}
