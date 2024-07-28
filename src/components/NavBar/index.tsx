import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";



const NavBar = () => {
  const navItems = [
    {
      label: (<Link to='/home'>Home</Link>),
      key: "home",
      icon: <MailOutlined />,
    },
    {
      label: (<Link to='/units'>Units</Link>),
      key: "units",
      icon: <MailOutlined />,
    },
  ];
  return <Menu items={navItems} mode="horizontal"/>;
};

export default NavBar;
