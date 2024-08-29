import { useContext, useEffect, useState } from "react";
import classes from "./WishList.module.css";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { WishListContext } from "../../context/WishListContext";
import {Helmet} from "react-helmet";
export default function WishList() {
  const { userToken } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const { getWishListDetails, removeFromWishList } =
    useContext(WishListContext);
  const [wishListDetails, setWishListDetails] = useState([]);
  const [wishListId, setWishListId] = useState(null);
  const headers = { token: userToken };

  useEffect(() => {
    getLoggedUserWishList();
  }, [userToken]);

  async function getLoggedUserWishList() {
    const res = await getWishListDetails();
    if (res.status === "success") {
      setWishListDetails(res.data);
      setWishListId(res.data._id);
      console.log(res);
    } else {
      console.log("error");
    }
  }

  async function removeProductWishList(productId) {
    const res = await removeFromWishList(productId);
    if (res.status === "success") {
      toast.success(res.message);
      setWishListDetails(
        wishListDetails.filter((item) => item.id !== productId)
      );
      setWishListId(res.data._id);
    } else {
      console.log("error");
    }
  }
  return (
    <>
      <h1>wishlist</h1>
      <section className="py-5">
        <div className="container mx-auto">
          {wishListDetails && wishListDetails.length > 0 ? (
            <>
              <div className=" my-3">
                <h4 className="text-lg">Total items <span className="text-green-600">{wishListDetails.length}</span></h4>
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
                        CART
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishListDetails?.map((product, index) => (
                      <tr
                        key={index}
                        className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={product.slug}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.title}
                        </td>

                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          <button
                            onClick={() => addToCart(product.id)}
                            className="btn"
                          >
                            AddToCart
                          </button>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => removeProductWishList(product.id)}
                            className="font-medium  bg-red-600 p-2 text-white rounded dark:text-red-500 hover:bg-red-400"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Helmet>
                <meta charSet="utf-8" />
                <title>WishList Page </title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
            </>
          ) : (
            <p className="text-lg text-center bg-green-400 p-2 mt-5">
              Your wishlist is empty.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
