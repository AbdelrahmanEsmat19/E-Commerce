import { useEffect, useState } from "react";
import classes from "./RecentProducts.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function GetRecentProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetRecentProducts();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    const filtered = products.filter((product) => {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto  ">
          <form className="mb-8" onSubmit={handleSubmit}>
            <label
              for="search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
                value={search}
                onChange={handleSearch}
              />
            </div>
          </form>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="bg-red-500 p-3">{error}</div>
          ) : (
            <div className="row justify-center">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              ) : search !== "" ? (
                <div className="text-center">No products found</div>
              ) : (
                products.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}