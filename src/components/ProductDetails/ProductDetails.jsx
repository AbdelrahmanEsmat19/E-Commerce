import { useContext, useEffect, useState } from "react";
import classes from "./ProductDetails.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { WishListContext } from "../../context/WishListContext";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const { isInWishList, removeFromWishList, addToWishList } =
    useContext(WishListContext);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    fade: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  async function GetProductDetails(id) {
    
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log(data.data);
      setProductDetails(data.data);

      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetProductDetails(id);
  }, [id]);

  async function addProductToCart(productId) {
    const res = await addToCart(productId);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader fullPage />
      ) : (
        <section className="py-20">
          <div className="container mx-auto  ">
            {error ? (
              <div className="bg-red-500 p-3">{error}</div>
            ) : (
              <div className="row items-center">
                <div className="w-1/3 px-4">
                  <Slider {...settings}>
                    {productDetails?.images?.map((image, index) => (
                      <img key={index} src={image} alt={productDetails.title} />
                    ))}
                  </Slider>
                </div>
                <div className="w-2/3 px-20  ">
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`${productDetails.slug}`} </title>
                    <link rel="canonical" href="http://mysite.com/example" />
                  </Helmet>{" "}
                  <h1 className="mb-4 text-left">{productDetails.title}</h1>
                  <p className="mb-4 text-left">{productDetails.description}</p>
                  <div className="mb-3 flex justify-between items-center text-gray-500 font-light">
                    <div>
                      <p>{productDetails?.category?.name}</p>
                      <span>{productDetails.price} EGP</span>
                    </div>
                    <div>
                      <i className="fas fa-star text-yellow-400"></i>
                      <span>{productDetails.ratingsAverage}</span>
                    </div>
                    <div>
                      {" "}
                      <button
                        onClick={() => {
                          if (isInWishList(productDetails.id)) {
                            removeFromWishList(productDetails.id);
                            toast.warning(
                              "product removed successfully from WishList"
                            );
                          } else {
                            addToWishList(productDetails.id);
                          }
                        }}
                      >
                        {isInWishList(productDetails.id) ? (
                          <i class="fa-solid fa-heart fa-2xl text-red-600"></i>
                        ) : (
                          <i class="fa-solid fa-heart fa-2xl"></i>
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => addProductToCart(productDetails.id)}
                    className="btn text-white lg:w-full"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      <RelatedProducts />
    </>
  );
}
