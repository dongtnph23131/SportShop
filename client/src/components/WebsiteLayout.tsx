import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'



// import css 
import "../Assets/Header.css"
import "../Assets/utilities.css"
import "../Assets/Footer.css"
import "../Assets/Home.css"
import "../Assets/Login.css"
// End css 


const WebsiteLayout = () => {
  return (
    <div>
        <Header></Header>
        <Outlet/>
        <Footer></Footer>
    </div>
  )
}

export default WebsiteLayout