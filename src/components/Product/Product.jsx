import { useContext, useEffect, useState } from "react";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

import { WishListContext } from "../../context/WishListContext";

export default function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishList, isInWishList, removeFromWishList } =
    useContext(WishListContext);

  const [loading, setLoading] = useState(false);

  async function addProductToCart(productId) {
    setLoading(true);
    const res = await addToCart(productId);
    setLoading(false);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error("Something went wrong");
    }
  }

  async function addProductToWishList(productId) {
    if (isInWishList(productId)) {
      await removeFromWishList(productId);
      toast.warning("Product removed successfully from WishList");
    } else {
      await addToWishList(productId);
    }
  }

  return (
    <div
      className={`card rounded-xl text-start lg:w-[250px]  w-full ${classes.productCard}`}
    >
      <Link  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to={`/product-details/${product.id}/${product.category.name}`}>
        <img
          src={product.imageCover}
          alt={product.title}
          className={`rounded-t-lg ${classes.productImage}`}
        />
        <div className={classes.productInfo}>
          <span className={`text-sm text-green-900 dark:text-orange-500 ${classes.category}`}>
            {product.category.name}
          </span>
          <h2
            className={`text-lg font-semibold truncate ${classes.productTitle}`}
          >
            {product.title}
          </h2>
          <div className={classes.productDetails}>
            <span className="text-gray-500 dark:text-green-500 font-light">
              {product.price} EGP
            </span>
            <div className={classes.rating}>
              <i className="fas fa-star text-yellow-400"></i>
              <span>{product.ratingsAverage}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex justify-evenly">
        <button
          onClick={() => addProductToCart(product.id)}
          className={`btn ${classes.addToCartBtn} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <i class="fas fa-spinner fa-spin"></i>
          ) : (
            <i class="fa-solid fa-plus"></i>
          )}
          {loading ? 'Adding...' : 'Add'}
        </button>
        <button
          onClick={() => addProductToWishList(product.id)}
          className={` ${classes.addToWishListBtn}`}
        >
          {isInWishList(product.id) ? (
            <i class="fa-solid fa-heart fa-2xl text-red-600"></i>
          ) : (
            <i class="fa-solid fa-heart fa-2xl"></i>
          )}
          {isInWishList(product.id) ? '' : ''}
        </button>{" "}
      </div>
    </div>
  );
}