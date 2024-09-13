import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { initFlowbite } from "flowbite";
import { WishListContext } from "../../context/WishListContext";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const { userToken, setUserToken } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);
  const { numOfWishlist } = useContext(WishListContext);

  useEffect(() => {
    initFlowbite();
  }, []);

  function handleLogout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl  flex flex-wrap items-center md:justify-evenly   justify-evenly  lg:justify-between mx-auto p-2 lg:p-4">
        <Link
          to="/"
          className={"flex items-center pb-2 space-x-3 rtl:space-x-reverse"}
        >
          <img src="./favicon.png" className="h-8" alt="Fresh Cart Logo" />
          <span className="self-center  text-2xl font-semibold whitespace-nowrap dark:text-white">
            FreshCart
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 items-center md:space-x-0 rtl:space-x-reverse">
          <ul className="flex flex-col p-2 md:p-0 me-8 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:text-white dark:border-gray-700">
            {userToken ? (
              <>
                <li onClick={handleLogout}>
                  <Link to={"/login"}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <NavLink to={"/register"}>Register</NavLink>
                </li>
                <li>
                  <NavLink to={"/login"}> Login</NavLink>
                </li>
                <li>
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      class="sr-only peer"
                      checked={darkMode}
                    />
                    <div
                      onClick={handleToggleDarkMode}
                      class="relative w-11 h-6 mt-3 lg:mt-0 md:mt-0 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer"
                    >
                      <i
                        class={`fas ${
                          darkMode ? "fa-moon" : "fa-sun"
                        } text-lg text-yellow-300 dark:text-blue-600 transition-all duration-300`}
                      ></i>
                    </div>
                  </label>{" "}
                </li>
              </>
            )}
          </ul>
          <ul className="flex justify-center space-x-[.5rem] font-normal">
            <li>
              <i className="fa-brands bg-blue-700 text-white fa-facebook border p-2  rounded-full"></i>
            </li>
            <li>
              <i className="fa-brands bg-[#1DA1F2] text-white border p-2  rounded-full fa-twitter "></i>
            </li>
            <li>
              <i className="fa-brands bg-[#0073B1] text-white  border p-2  rounded-full fa-linkedin-in"></i>
            </li>
            <li>
              <i className="fa-solid border p-2 bg-[#3498db] text-white rounded-full fa-globe"></i>
            </li>
            <li>
              <i className="fa-brands bg-[#000] text-white border p-2  rounded-full fa-tiktok"></i>
            </li>
          </ul>

          {userToken && (
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center md:justify-around text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600  "
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          )}
        </div>
        <div
          className="items-center justify-between  hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          {userToken && (
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={
                    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className={
                    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={
                    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className={
                    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  className={
                    "block py-2 relative px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                >
                  WhishList
                  <div className="absolute inline-flex lg:bottom-0 ms-3 lg:ms-0 md:ms-0  lg:end-5 lg:top-5 items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full   dark:border-gray-900">
                    {numOfWishlist}
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={
                    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  dark:border-gray-700"
                  }
                >
                  <button
                    type="button"
                    className="relative inline-flex items-center  text-sm font-medium text-center text-black  rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    <i className="fas fa-cart-shopping fa-2x dark:text-white"></i>
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                      {numOfCartItems}
                    </div>
                  </button>
                </NavLink>
              </li>
              <li>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    checked={darkMode}
                  />
                  <div
                    onClick={handleToggleDarkMode}
                    class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer"
                  >
                    <i
                      class={`fas ${
                        darkMode ? "fa-moon" : "fa-sun"
                      } text-lg text-yellow-300 dark:text-blue-600 transition-all duration-300`}
                    ></i>
                  </div>
                </label>{" "}
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
