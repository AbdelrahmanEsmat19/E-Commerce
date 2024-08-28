import { useEffect, useState } from "react";
import classes from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  async function getCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category.id} className={classes.categoryItem}>
                <img src={category.image} alt={category.slug} />
                <h2 className="text-xl font-semibold mt-2">{category.name}</h2>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}
