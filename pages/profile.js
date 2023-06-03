import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import BottomTabs from '../Components/BottomTabs'
import Button from '../Components/Button'
import styles from '../styles/Profile.module.css'

const Profile = ({ profile, logoutFacebook }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <>
            <div className={styles.mainContainer}>
                {profile?.picture?.data?.url &&
                    <Image alt='splash image' width={100} height={100} className={styles.image} src={profile?.picture?.data?.url} />
                }
                <h6 className={styles.h6}>{profile?.name}</h6>
                <Button title={'Inviter'} btnStyle={{ width: '130px', padding: '5px 10px', marginTop: '0.5cm', marginBottom: '1cm', }} path='Home' />
                <div>
                    <h6 className={styles.para}>Notifications</h6>
                    <div className={styles.card}>
                        <div className="card-body">
                            Autoriser les<br></br>
                            notifications
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        </div>
                    </div>
                    <h6 className={styles.para}>Lien</h6>
                    <div className={styles.card}>
                        <div className="card-body">
                            Invite tes amis
                        </div>
                        <Button title={'Inviter'} btnStyle={{ width: '130px', padding: '5px 10px', }} path='Home' />
                    </div>
                </div>
                {clicked ? 
                    <div style={{ marginTop: '1.5cm' }} className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                :
                    <h6 className={styles.para} style={{ marginTop: '1.5cm', cursor: 'pointer' }} onClick={() => { setClicked(true); logoutFacebook(); }}>Logout</h6>
                }
            </div>
            <BottomTabs />
        </>
    )
}

export default Profile