import Header from "./Header"
import layoutStyles from '../styles/Layout.module.css'
import Head from "next/head"
import Script from "next/script"
import Image from 'next/image'
import SplashScreen from '../public/splashscreen.jpeg'
import { useEffect, useState } from "react"
const Layout = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
      const subscribe = setInterval(()=>{
        setIsLoaded(true)
      },1000)
    
      return () => {
        subscribe
      }
    }, [])
    
    return (
        <>
            <div className={layoutStyles.container}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
                </Head>
                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></Script>

                <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></Script>
                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></Script>
                <main className={layoutStyles.main}>
                    {/* <Header /> */}
                    {isLoaded?
                    children
                    :
                    <div style={{textAlign:'center'}}>
                        <Image alt='splash image' layout="fill" className={layoutStyles.image} style={{}} src={SplashScreen} />
                        <div style={{marginTop:'50vh'}} className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    }
                </main>
            </div>
        </>
    )
}

export default Layout