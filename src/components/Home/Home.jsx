import { useEffect, useState } from 'react'
import classes from "./Home.module.css"
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import RecentProducts from '../RecentProducts/RecentProducts'
import Loader from '../Loader/Loader'
import {Helmet} from "react-helmet";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader fullPage={true} />
      ) : (
        <>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
          <MainSlider/>
          <CategorySlider/>
          <RecentProducts/>
        </>
      )}
    </>
  )
}