import { useEffect, useState } from "react";
import classes from "./Brands.module.css";
import useRequest from "../../Hooks/useRequest";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { Helmet } from "react-helmet";

export default function Brands() {
  const { data, isLoading, isError } = useRequest(
    "https://ecommerce.routemisr.com/api/v1/brands",
    "brands"
  );

  if (isLoading) {
    return <Loader fullPage={true} />;
  }

  return (
    <section className={classes.brandsSection}>
      <div className={classes.container}>
        <h1 className={classes.title}>
          Our <span className={classes.highlight}>Brands</span>
        </h1>

        <div
          className={"grid gap-5  grid-cols-1 lg:justify-items-center lg:grid-cols-3 md:grid-cols-4 "}
        >
          {isError ? (
            <Error />
          ) : (
            data.map((brand) => (
              <div key={brand.id} className={classes.brandCard}>
                <div className={classes.brandImage}>
                  <img
                    src={brand.image}
                    alt={brand.slug}
                    className={classes.image}
                  />
                </div>
                <h2 className={classes.brandName}>{brand.name}</h2>
                <p className={classes.brandDescription}>{brand.description}</p>
                <button className={classes.exploreButton}>
                  Explore {brand.name}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </section>
  );
}
