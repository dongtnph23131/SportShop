import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// import css
import "../Assets/css/meanmenu.css";
import "../Assets/Header.css";
import "../Assets/utilities.css";
import "../Assets/Footer.css";
import "../Assets/Home.css";
import "../Assets/Login.css";
import "../Assets/style.css";
import "../Assets/changerPass.css";
import "../Assets/search.css";
import "../Assets/CSS/style.css";
import "../Assets/CSS/default.css";

// End css

const WebsiteLayout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default WebsiteLayout;
