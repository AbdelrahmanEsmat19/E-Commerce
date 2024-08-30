import { useEffect, useState } from "react";
import classes from "./Footer.module.css";
export default function Footer() {
  return (
    <>
      <footer className="bg-[#001e2b] ">
        <h2 className="text-center">
          <div className="flex  px-40 py-12 ">
            {" "}
            <img src="./favicon.png" className="h-8" alt="Fresh Cart Logo" />
            <span className="self-center ps-2 text-2xl text-white font-semibold whitespace-nowrap dark:text-white">
              FreshCart
            </span>
          </div>
          <hr className="mx-36 border-t-2 border-green-500" />
        </h2>
        <div className="row lg:text-start lg:px-44 text-center  headings p-8  ">
          <div className="w-full mb-8 lg:mb-0 md:w-1/3 lg:w-1/5">
            <div>
              <h3 className="mb-4 text-white">Categories</h3>
              <ul className="space-y-3">
                <li className={classes.liClasses}>Men's Fashion</li>
                <li className={classes.liClasses}>Women's Fashion</li>
                <li className={classes.liClasses}>SuperMarket</li>
                <li className={classes.liClasses}>Baby & Toys</li>
                <li className={classes.liClasses}>Beauty & Health</li>
                <li className={classes.liClasses}>Mobiles</li>
                <li className={classes.liClasses}>Electronics</li>
              </ul>
            </div>
          </div>
          <div className="w-full mb-8 lg:mb-0 md:w-1/3 lg:w-1/5 ">
            <div>
              <h3 className="mb-4 text-white">Get to know us</h3>
              <ul className="space-y-3">
                <li className={classes.liClasses}>Company</li>
                <li className={classes.liClasses}>About</li>
                <li className={classes.liClasses}>Blog</li>
                <li className={classes.liClasses}>Help Center</li>
                <li className={classes.liClasses}>Our Value</li>
              </ul>
            </div>
          </div>
          <div className="w-full mb-8 lg:mb-0 md:w-1/3 lg:w-1/5 ">
            <div>
              <h3 className="mb-4 text-white">For Consumers</h3>
              <ul className="space-y-3">
                <li className={classes.liClasses}>Payments</li>
                <li className={classes.liClasses}>Shipping</li>
                <li className={classes.liClasses}>Product Returns</li>
                <li className={classes.liClasses}>Baby & Toys</li>
                <li className={classes.liClasses}>FAQ</li>
                <li className={classes.liClasses}>Mobiles</li>
                <li className={classes.liClasses}>Shop Checkout</li>
              </ul>
            </div>
          </div>
          <div className="w-full mb-8 lg:mb-0 md:w-1/3 lg:w-1/5 ">
            <div>
              <h3 className="mb-4 text-white">Become a Shopper</h3>
              <ul className="space-y-3">
                <li className={classes.liClasses}>Shopper Opportunities</li>
                <li className={classes.liClasses}>Women's Fashion</li>
                <li className={classes.liClasses}>Become a Shopper</li>
                <li className={classes.liClasses}>Earnings</li>
                <li className={classes.liClasses}>Ideas & Guides</li>
                <li className={classes.liClasses}>New Retailers</li>
              </ul>
            </div>
          </div>
          <div className="w-full mb-8 lg:mb-0 md:w-1/3 lg:w-1/5 ">
            <div>
              <h3 className="mb-4 text-white">Freshcart programs</h3>
              <ul className="space-y-3">
                <li className={classes.liClasses}>Freshcart programs</li>
                <li className={classes.liClasses}>Gift Cards</li>
                <li className={classes.liClasses}>Promos & Coupons</li>
                <li className={classes.liClasses}>Freshcart Ads</li>
                <li className={classes.liClasses}>Careers</li>
              </ul>
            </div>
          </div>
  
        </div>
        <hr className="mx-36 border-t-2 border-green-500" />
        <div className="text-center py-5 text-gray-600 ">
          © 2024 FreshCart E-Commerce . All rights reserved. Powered by{" "}
          <span className="color-green">Abdelrahman Esmat</span>.
          <ul className="flex justify-center space-x-[.5rem] mt-4 font-normal">
            <li>
              <i className="fa-brands bg-blue-700 text-white fa-facebook border p-2  rounded-full"></i>
            </li>
            <li>
              <i className="fa-brands bg-[#1DA1F2] text-white border p-2  rounded-full fa-twitter "></i>
            </li>
            <li>
              <i className="fa-brands bg-[#0073B1] text-white  border p-2  rounded-full fa-linkedin-in"></i>
            </li>
            <li>
              <i className="fa-solid border p-2 bg-[#3498db] text-white rounded-full fa-globe"></i>
            </li>
            <li>
              <i className="fa-brands bg-[#000] text-white border p-2  rounded-full fa-tiktok"></i>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
