import { useEffect, useState } from "react";
import classes from "./Products.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import { Helmet } from "react-helmet";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function getProducts() {
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
    getProducts();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
  };
  
  useEffect(() => {
    if (search === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  }, [search, products]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="py-5 lg:p-0">
        {isLoading ? (
          <Loader fullPage={true} />
        ) : (
          <div className="container mx-auto">
            <h1 className="text-lg font-bold text-center mb-5">
              Our <span className="color-green">Products</span>
            </h1>
            <form className="mb-8" onSubmit={handleSubmit}>
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900  sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </form>
            <Helmet>
              <meta charSet="utf-8" />
              <title>Products Page</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {error ? (
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
        )}
      </section>
    </>
  );
}