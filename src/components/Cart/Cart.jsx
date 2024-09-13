import { useContext, useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    getLoggedUserCart,
    cartDetails,
    numOfCartItems,
    setCartDetails,
    RemoveFromCart,
    UpdateProductQuantity,
    setnumOfCartItems,
    RemoveAllCart,
  } = useContext(CartContext);

  const { userToken } = useContext(UserContext);
  async function getLoggedCartDetails() {
    const res = await getLoggedUserCart();
    if (res.status === "success") {
      setCartDetails(res.data);
    } else {
      console.log(res);
    }
  }
  async function removeProductCart(productId) {
    const res = await RemoveFromCart(productId);
    console.log(res);
    if (res.status === "success") {
      toast.warning("Product removed successfully");
    } else {
      toast.error("Something went wrong");
    }
  }
  async function removeAllProductsCart() {
    const res = await RemoveAllCart();

    if (res.status === "success") {
      console.log(res);
    } else {
      console.log(error);
    }
  }
  async function UpdateQuantity(productId, count) {
    if (count === 0) {
      await removeProductCart(productId);
    } else {
      const res = await UpdateProductQuantity(productId, count);

      console.log(res);
      if (res.status === "success") {
        toast.success("Qty updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  useEffect(() => {
    getLoggedCartDetails();
  }, [userToken]);

  return (
    <>
      <section className="py-5">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Cart</h1>
          {cartDetails && cartDetails.products.length > 0 ? (
            <>
              <div className="flex  justify-between items-center my-3">
                <h4 className="text-lg">
                  Total items:
                  <span>{numOfCartItems}</span>
                </h4>
                <h4 className="text-lg">
                  Total price:
                  <span className="text-green-400 font-bold">
                    {cartDetails.totalCartPrice}
                  </span>
                </h4>
              </div>
              <div className="relative overflow-x-auto   shadow-md sm:rounded-lg">
                <table className="w-full   text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>Cart Page</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                  </Helmet>
                  <tbody>
                    {cartDetails?.products.map((product) => (
                      <tr
                        key={product.product.id}
                        className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={product.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center lg:translate-x-12">
                            <button
                              onClick={() =>
                                UpdateQuantity(
                                  product.product.id,
                                  product.count - 1
                                )
                              }
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>

                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>{product.count}</div>
                            <button
                              onClick={() =>
                                UpdateQuantity(
                                  product.product.id,
                                  product.count + 1
                                )
                              }
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {(product.price * product.count).toFixed()} EGP
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              removeProductCart(product.product.id)
                            }
                            className="font-medium  bg-red-600 p-2 text-white dark:text-white rounded dark:text-red-500 hover:bg-red-400"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link
                to={"/checkout"}
                className="w-full btn text-white block my-6"
              >
                Checkout
              </Link>
              <Link
                to={"/cart"}
                className="p-3 bg-red-600 text-white w-full "
                onClick={() => removeAllProductsCart()}
              >
                CLear All Cart
              </Link>
            </>
          ) : (
            <p className="text-lg text-center bg-green-400 p-2 mt-5">
              Your cart is empty. Please add some products to proceed.
            </p>
          )}
          <Helmet>
            <meta charSet="utf-8" />
            <title>Cart Page </title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
        </div>
      </section>
    </>
  );
}
