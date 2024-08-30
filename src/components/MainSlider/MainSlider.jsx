import { useState } from "react";
import classes from "./MainSlider.module.css";

import Slide1 from "../../assets/images/slider-image-1.jpeg";
import Slide2 from "../../assets/images/slider-image-2.jpeg";
import Slide3 from "../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function MainSlider() {

  const settings = {
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 3000,
  };

  const images = [
    {
      src: Slide1,
      alt: "image 1",
      text: {
        title: "SuperMarket For Fresh Grocery",
        subtitle:
          "Introduced a new model for online grocery shopping and convenient home delivery.",
        badge: "Opening Sale Discount 50%",
      },
    },
    {
      src: Slide2,
      alt: "image 2",
      text: {
        title: "Fresh Produce Delivered Right to Your Door",
        subtitle:
          "Experience the convenience of online grocery shopping with our wide selection of fresh produce.",
        badge: "Free Delivery on Orders Over $50",
      },
    },
    {
      src: Slide3,
      alt: "image 3",
      text: {
        title: "Grocery Shopping Made Easy",
        subtitle:
          "Shop from the comfort of your own home and have your groceries delivered right to your door.",
        badge: "Buy One Get One Free",
      },
    },
  ];

  return (
    <>
      <Slider {...settings}>
        {images.map((image, index) => (
          <section key={index} className="pt-5 lg:p-0">
            <div className="container mx-auto">
              <div className="relative ">
                <img className="w-full h-[600px] " src={image.src} alt="" />
                <div className="w-1/2 ps-4 space-y-4 absolute top-1/2 ">
                  <span className="bg-yellow-400 p-2 rounded-lg">
                    {image.text.badge}
                  </span>
                  <h2 className="lg:text-4xl font-bold">{image.text.title}</h2>
                  <p className="font-light lg:text-2xl text-gray-500 font-medium">
                    {image.text.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </Slider>
    </>
  );
}
