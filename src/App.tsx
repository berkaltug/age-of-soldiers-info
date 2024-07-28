import React from "react";
import "./App.css";
import {  Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UnitsPage from "./pages/UnitsPage";
import UnitDetailPage from "./pages/UnitDetailPage";
import Layout from "./Layout";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider theme={{}}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace/>} />
         
        <Route element={<Layout />}>
          <Route index path="/home" element={<HomePage />} />
          <Route path="/units" element={<UnitsPage />} />
          <Route path="/units/:id" element={<UnitDetailPage />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
