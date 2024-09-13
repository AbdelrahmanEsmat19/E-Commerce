import { useEffect, useState } from "react";
import classes from "./Categories.module.css";
import useRequest from "../../Hooks/useRequest";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { Helmet } from "react-helmet";

export default function Categories() {
  const { data, isLoading, isError } = useRequest(
    "https://ecommerce.routemisr.com/api/v1/categories",
    "categories"
  );

  return (
    <section className={classes.categoriesSection}>
      {isLoading ? (
        <Loader fullPage={true} />
      ) : (
        <div className={classes.container}>
          <h1 className={classes.title}>
            Our <span className={'color-green'}>Categories</span>
          </h1>
          {isError ? (
            <Error />
          ) : (
            <div
              className={`grid gap-8 grid-cols-1  justify-items-center lg:grid-cols-3 md:grid-cols-3 `}
            >
              {data.map((category) => (
                <div key={category.id} className={` ${classes.card} dark:bg-gray-900 `}>
                  <img
                    src={category.image}
                    className={classes.image}
                    alt={category.slug}
                  />
                  <h2 className={` ${classes.cardTitle} mt-4 `}>
                    {category.name}
                  </h2>
                </div>
              ))}
              <Helmet>
                <meta charSet="utf-8" />
                <title>Categories Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
