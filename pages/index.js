import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Index.module.css'
import SplashScreen from '../public/splashscreen.jpeg'
import Button from '../Components/Button'
import BottomTabs from '../Components/BottomTabs'
import Header from '../Components/Header'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { ImSpoonKnife } from 'react-icons/im'
import { AiFillMobile } from 'react-icons/ai'
import { QrReader } from 'react-qr-reader'
import QRCodeReader from '../Components/QrCodeReader'
import { CallWaiter, CheckIn, OrderBill } from '../services/CommonServices'

export default function Home({ loggedIn, logoutFacebook, loginFacebook, profile }) {

  const [scannerActive, setScannerActive] = useState(false);
  const [scannedData, setScannedData] = useState("");

  const qrRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user == undefined) {
      logoutFacebook();
    }
    if (user?.QRCode) {
      setScannedData(user?.QRCode);
    }
  }, [])

  return (
    <>
      {!loggedIn ?
        <div className={styles.container}>
          <Image alt='splash image' className={styles.image} src={SplashScreen} />
          <div className={styles.child}>
            <Button onClick={() => {
              loginFacebook();
            }} title={'Sign In With Facebook'} />

            <p className={styles.para}>By continuing you agree to the terms and conditions.</p>
          </div>
        </div>
        :
        <>
          <Header profile={profile} />
          <div style={{ textAlign: 'center', }}>
            <h6 className={styles.h6}>{profile?.name} 👋</h6>
            <div className={styles.cardContainer}>


              <div className={styles.card}>
                <div className="card-body text-center">
                  {scannedData != "" ?
                    <>
                      <span>{scannedData}</span>
                    </>
                    :
                    <>
                      {scannerActive ?
                        <>
                          <QRCodeReader
                            onResult={async (result) => {
                              const checkIn = await CheckIn(result);
                              console.log('checkIn', checkIn)
                              if (checkIn?.result?.errorCode) {
                                if (checkIn?.result?.errorCode === "checkInAlreadyCheckedInSameTable") {
                                  setScannedData(checkIn?.result.result.qrCode);
                                  let tempDetails = JSON.parse(localStorage.getItem("userDetails"));
                                  tempDetails.QRCode = checkIn?.result.result.qrCode;
                                  localStorage.setItem("userDetails", JSON.stringify(tempDetails));
                                }else{
                                  alert(checkIn?.result?.errorMessage ?? checkIn?.result?.message ?? "Error");
                                }
                              } else {
                                alert(checkIn?.result?.message);
                                setScannedData(result);
                                let tempDetails = JSON.parse(localStorage.getItem("userDetails"));
                                tempDetails.QRCode = result;
                                localStorage.setItem("userDetails", JSON.stringify(tempDetails));
                              }
                              setTimeout(() => { setScannerActive(false) }, 500)
                            }}
                          />
                        </>
                        :
                        <span onClick={() => { setScannedData(""); setScannerActive(!scannerActive) }}>SCANNER LE QR CODE</span>
                      }
                    </>
                  }
                </div>
              </div>
              {scannedData != "" &&
                <>
                  <div className={styles.card}>
                    <div role={"button"} className="card-body d-flex align-content-center justify-content-center"
                      onClick={async () => {
                        const response = await CallWaiter();
                        console.log(response);
                        if (response?.result?.errorCode) {
                          alert(response?.result?.errorMessage ?? response?.result?.message ?? "Error");
                        } else {
                          alert(response?.result?.message);
                        }
                      }}
                    >
                      <div>
                        APPELER LE SERVEUR
                      </div>
                      <div>
                        <AiFillMobile color='black' size={25} style={{ marginLeft: '10px' }} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div role={"button"} className="card-body d-flex align-content-center justify-content-center"
                      onClick={async () => {
                        const response = await OrderBill();
                        console.log(response);
                        if (response?.result?.errorCode) {
                          alert(response?.result?.errorMessage ?? response?.result?.message ?? "Error");
                        } else {
                          alert(response?.result?.message);
                        }
                      }}
                    >
                      <div>
                        DEMANDER L&apos;ADDITION
                      </div>
                      <div>
                        <RiMoneyDollarCircleFill size={25} color='orange' style={{ marginLeft: '10px' }} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div role={"button"} className="card-body d-flex align-content-center justify-content-center">
                      <div>
                        CONSULTER LE MENU
                      </div>
                      <div>
                        <ImSpoonKnife color='grey' size={25} style={{ marginLeft: '10px' }} />
                      </div>
                    </div>
                  </div>
                </>
              }
              <Button title={scannerActive ? "Close" : 'Scan QR Code'}
                btnStyle={{
                  width: '150px',
                  padding: '5px 10px',
                  marginTop: '1.5cm'
                }}
                onClick={() => { setScannedData(""); setScannerActive(!scannerActive) }}
                path='Home'
              />
            </div>
          </div>
          <BottomTabs />
        </>
      }
    </>
  )
}
