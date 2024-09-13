import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";
import useRequest from "../Hooks/useRequest";
export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userToken } = useContext(UserContext);
  const headers = { token: userToken };
  const endPoint = "https://ecommerce.routemisr.com/api/v1/cart";
  const [cartDetails, setCartDetails] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [cartOwner, setCartOwner] = useState(null);

  useEffect(() => {
    userToken && getLoggedUserCart();
  }, [userToken]);

  async function getLoggedUserCart() {
    const endPoint = "https://ecommerce.routemisr.com/api/v1/cart";
    try {
      const { data } = await axios.get(endPoint, { headers });
      setnumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setCartOwner(data.data.cartOwner);
      console.log(data);

      return data;
    } catch (error) {
      return error;
    }
  }
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(endPoint, { productId }, { headers });

      if (data.status === "success") {
        setnumOfCartItems(data.numOfCartItems);
        setCartDetails(data.data);
        setCartId(data.data._id);
      }
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  async function RemoveFromCart(productId) {
    const endPoint = "https://ecommerce.routemisr.com/api/v1/cart";

    try {
      const { data } = await axios.delete(`${endPoint}/${productId}`, {
        headers,
      });
      console.log(data);
      setnumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);

      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
  async function RemoveAllCart() {
    const endPoint = "https://ecommerce.routemisr.com/api/v1/cart";

    try {
      const { data } = await axios.delete(endPoint, {
        headers,
      });
      setnumOfCartItems(0);
      setCartDetails({ products: [], totalCartPrice: 0 });
      setCartId(null);
      toast.warning("Products removed successfully");

      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  async function UpdateProductQuantity(productId, count) {
    const endPoint = "https://ecommerce.routemisr.com/api/v1/cart";

    try {
      const { data } = await axios.put(
        `${endPoint}/${productId}`,
        { count },
        { headers }
      );
      console.log(data);
      setnumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);

      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
  async function getPayment(url, shippingAddress) {
    try {
      const { data } = await axios.post(url, { shippingAddress }, { headers });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        numOfCartItems,
        cartDetails,
        RemoveFromCart,
        setCartDetails,
        UpdateProductQuantity,
        setnumOfCartItems,
        getPayment,
        cartId,
        RemoveAllCart,
        cartOwner,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
