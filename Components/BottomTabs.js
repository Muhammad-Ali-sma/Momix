import React from 'react'
import SplashScreen from '../public/splashscreen.jpeg'
import { FaHome,FaClipboard } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
const BottomTabs = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ paddingLeft: '2%', paddingRight: '2%', position: 'fixed', bottom: 0, width: '100vw' }}>
            <div className="container-fluid">
                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row align-items-center justify-content-around w-100" >
                        <li className="nav-item">
                            <Link href="/">
                                <div role="button" className="nav-link active fw-bold cursor-pointer"><FaHome />
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item" style={{backgroundColor:"rgb(0, 153, 255)",padding:'1px 10px',fontSize:'0.6cm', borderRadius:'50px',color:'white'}}>
                            <a className="active fw-bold" href="#">+</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active fw-bold" href="#"><FaClipboard /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default BottomTabs