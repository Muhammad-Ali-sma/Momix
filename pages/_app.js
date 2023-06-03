import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Layout from '../Components/Layout'
import styles from '../styles/Index.module.css'
import SplashScreen from '../public/splashscreen.jpeg'
import { useRouter } from 'next/router';
import { loginToMomix } from '../services/CommonServices'
function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    // load facebook sdk script
    initFacebookSdk();
  }, []);

  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    if (router.pathname !== "/" && !loggedIn) {
      router.push("/");
    }
    setIsLoading(false)

  }, [loggedIn]);

  const initFacebookSdk = async () => {
    // wait for facebook sdk to initialize before starting the react app
    FacebookLoginClient.clear();
    await FacebookLoginClient.loadSdk('en_US');
    setLoaded(true);
    FacebookLoginClient.init({ appId: process.env.NODE_ENV == "development" ? "1202187297038749" : "411131322261646", cookie: true, xfbml: true, version: 'v14.0' });
    FacebookLoginClient.getLoginStatus(({ authResponse }) => {
      if (authResponse) {
        getFacebookProfile();
      }
    });
  }

  const getFacebookProfile = async (login = false) => {
    FacebookLoginClient.getProfile(async (res) => {
      setProfile(res);
      if (login) {
        const loginRes = await loginToMomix(res);
        console.log("login", loginRes);
        if (loginRes.statusCode) {
          localStorage.setItem("userDetails", JSON.stringify(loginRes.result));
          localStorage.setItem("momixToken", loginRes.result.token);
        }
      }
    }, { fields: "id, name, email, picture, first_name, last_name" });
    setLoggedIn(true);
  }

  const loginFacebook = () => {
    FacebookLoginClient.login((res) => {
      if (res.status === 'connected') {
        getFacebookProfile(true);
      }
    }, {
      scope: 'public_profile, email',
    });
  }

  const logoutFacebook = () => {
    FacebookLoginClient.getFB().api('/me/permissions', 'DELETE', (res) => {
      console.log('permission completed!', res);
    });
    FacebookLoginClient.logout(() => {
      console.log('logout completed!');
      setLoggedIn(false);
    });
  }

  return (
    <>

      <Layout>
        {(loading || !loaded) ?
          <div className={styles.container}>
            <Image alt='splash image' className={styles.image} src={SplashScreen} />
          </div>
          :
          <Component {...pageProps} loggedIn={loggedIn} loginFacebook={loginFacebook} logoutFacebook={logoutFacebook} profile={profile} />
        }

      </Layout>
    </>
  )
}
// background-position: center;
// background-repeat: no-repeat;
// background-size: cover;
export default MyApp
