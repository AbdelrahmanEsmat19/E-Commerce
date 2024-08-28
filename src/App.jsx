import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
const Home = lazy(() => import("./components/Home/Home"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Categories = lazy(() => import("./components/Categories/Categories"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Register = lazy(() => import("./components/Register/Register"));
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const ForgetYourPassword = lazy(() =>
  import("./components/ForgetYourPassword/ForgetYourPassword")
);
const MyOrders = lazy(() => import("./components/MyOrders/MyOrders"));
const Login = lazy(() => import("./components/Login/Login"));
const Error = lazy(() => import("./components/Error/Error"));
const Products = lazy(() => import("./components/Products/Products"));
const ProductDetails = lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const WishList = lazy(() => import("./components/WishList/WishList"));
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";
import CartContextProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WishListContextProvider from "./context/WishListContext";
import { Detector } from "react-detect-offline";
import { useState, useEffect } from "react";


const queryClient = new QueryClient();
const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/Checkout",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Checkout />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Products />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <WishList />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Categories />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Brands />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MyOrders />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/forget-password",
        element: (
          <ProtectedAuth>
            <Suspense fallback={<Loader />}>
              <ForgetYourPassword />
            </Suspense>
          </ProtectedAuth>
        ),
      },
      {
        path: "/product-details/:id/:category",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <ProductDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuth>
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          </ProtectedAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuth>
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          </ProtectedAuth>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  const [showDetector, setShowDetector] = useState(true);


  useEffect(() => {
    const handleOnline = () => setShowDetector(true);
    const handleOffline = () => setShowDetector(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowDetector(false);
    }, 2000);
  }, []);
  return (
    <>
      {showDetector && (
        <Detector
          render={({ online }) => (
            <div
              className={`${
                online
                  ? "bg-green-700 p-3 rounded text-white"
                  : "bg-red-700 p-3 rounded "
              } fixed bottom-4 right-4 z-50`}
            >
              You are currently {online ? "online" : "offline"}
            </div>
          )}
        />
      )}
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <WishListContextProvider>
            <CartContextProvider>
              <RouterProvider router={router} />
              <ToastContainer />
            </CartContextProvider>
          </WishListContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
