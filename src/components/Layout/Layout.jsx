import { useContext, useEffect, useState } from "react";
import classes from "./Layout.module.css";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Layout() {
  const { userToken } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Outlet />
      </div>
      {userToken && <Footer />}
    </>
  );
}
