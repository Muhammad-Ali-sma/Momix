import headerStyles from '../styles/Header.module.css'
import Image from 'next/image'
import { Search } from 'react-bootstrap-icons'
import Link from 'next/link'

const Header = ({profile}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{paddingLeft:'2%',paddingRight:'2%'}}>
            <div className="container-fluid">
                <div className="navbar-collapse d-flex " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active fw-bold"  aria-current="page" href="#">Welcome, {profile?.name}</a>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                    <Search color='white' style={{marginRight:'2ch',fontWeight:'bold'}}/>
                    {profile?.picture?.data?.url &&
                        <Link href="/profile">
                            <Image role={"button"} alt='splash image' width={50} height={50} className={headerStyles.image} src={profile?.picture?.data?.url} /> 
                        </Link>
                    }
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Header

{/* <div>

            <ul className={headerStyles.container}>
                <div className={headerStyles.container}>
                <li className="nav-item w-100">
                    <a className="nav-link active" href="#">Home</a>
                </li>     
                  
            <div className='float-right text-light mx-100'>
                <Search/>
            {/* */}
        //     </div>
        //     </div>
        //     </ul>
          
        // </div> */}