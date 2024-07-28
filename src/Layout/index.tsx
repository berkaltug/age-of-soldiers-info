import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./style.scss"
const Layout = () => {
  return (
    <main className="main-layout">
      <NavBar />
      <Outlet />
    </main>
  );
};

export default Layout;
