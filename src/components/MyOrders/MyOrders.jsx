import { useContext, useEffect, useState } from "react";
import classes from "./MyOrders.module.css";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import {Helmet} from "react-helmet";

export default function MyOrders() {
  const { cartOwner } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getOrders() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`
      );
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, [cartOwner]);

  return (
    <section className="py-5">
      <div className="container mx-auto">
        <div className="my-3">
          <h4 className="text-lg font-bold mb-4 text-blue-600">
            My Orders ({orders.length})
          </h4>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  City
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                    index % 2 === 0 ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {order.shippingAddress.details}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {order.shippingAddress.phone}
                  </td>
                  <td className="px-6 py-4">{order.shippingAddress.city}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    EGP {order.totalOrderPrice}
                  </td>
                  <td className="px-6 py-4">{order.updatedAt}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {order.shippingAddress.details}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {order.paymentMethodType}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    EGP {order.totalOrderPrice}
                  </td>
                </tr>
              ))}
              <Helmet>
                <meta charSet="utf-8" />
                <title>My Orders Page </title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
            </tbody>
          </table>
          {loading && (
            <div className="text-center py-4">
              <span className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </span>
            </div>
          )}
          {error && (
            <div className="text-center py-4 text-red-500">{error}</div>
          )}
        </div>
      </div>
    </section>
  );
}
