import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/Index.module.css'

const Button = ({title,onClick,btnStyle}) => {
  const router = useRouter()
  const btn={
    backgroundColor: 'rgb(0, 153, 255)',
     color:'white',
     maxWidth:' 90vw',
     width: '350px',
     padding: '10px',
     borderRadius: '20px',
     fontWeight: '700',
     border: 'none',
     outline: 'none'   ,
     ...btnStyle  

}
  return (
    <button type='button' style={btn} onClick={onClick}>{title}</button>
  )
}

export default Button