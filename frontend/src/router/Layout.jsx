import React from "react";
import Sidebars from "../components/Sidebar/Sidebars";
import { Outlet } from "react-router-dom";

const Layout =  () => {

  return (
    <>
      <Sidebars/>
      <div className="p-4 sm:ml-64">
        <Outlet/>
      </div>
    </>
  );
};

export default Layout;
