import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const { userToken } = useContext(UserContext);
  const [wishListDetails, setWishListDetails] = useState(null);
  const [wishListId, setWishListId] = useState(null);
  const [numOfWishlist, setNumOfWishlist] = useState(null);

  const [wishlistProducts, setWishListProducts] = useState(
    JSON.parse(localStorage.getItem("wishlistProducts")) || []
  );
  const headers = { token: userToken };

  async function addToWishList(productId) {
    const endPoint = "https://ecommerce.routemisr.com/api/v1/wishlist";
    try {
      const { data } = await axios.post(endPoint, { productId }, { headers });
      console.log(data);
      if (data.status === "success") {
        toast.success(data.message);
        setWishListDetails(data.data);
        setWishListId(data.data._id);
        setWishListProducts((prevProducts) => [...prevProducts, productId]);
      } else {
        console.log(data);
      }
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  function isInWishList(productId) {
    return wishlistProducts ? wishlistProducts.includes(productId) : false;
  }

  useEffect(() => {
    localStorage.setItem("wishlistProducts", JSON.stringify(wishlistProducts));
  }, [wishlistProducts]);

  async function getWishListDetails() {
    const endPoint = "https://ecommerce.routemisr.com/api/v1/wishlist";
    try {
      const { data } = await axios.get(endPoint, { headers });

      setNumOfWishlist(data.count);
      return data;
    } catch (error) {
      return error;
    }
  }
  useEffect(() => {
    userToken && getWishListDetails();
  }, [userToken]);

  async function removeFromWishList(productId) {
    const endPoint = `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`;

    try {
      const { data } = await axios.delete(endPoint, { headers });
      setWishListProducts((prevProducts) =>
        prevProducts.filter((id) => id !== productId)
      );
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        isInWishList,
        wishlistProducts,
        getWishListDetails,
        wishListId,
        removeFromWishList,
        wishListDetails,
        numOfWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
