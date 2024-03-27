import React from "react";
import { useLocation } from "react-router-dom";
import Sidebars from "../components/Sidebar/Sidebars";

const Layout = ({ children }) => {
 
  const location = useLocation();
  const showSidebar = !["/login", "/signup"].includes(location.pathname);

  return (
    <div>
      {showSidebar && <Sidebars />}
      <div className="flex-grow p-4 sm:ml-64">{children}</div>
    </div>
  );
};

export default Layout;
