import React, { useState, useEffect } from "react";
import { VscDashboard } from "react-icons/vsc";
import { TbReportAnalytics, TbLogout2 } from "react-icons/tb";
import { SlGraph } from "react-icons/sl";
import { RiSettings4Line } from "react-icons/ri";
import { MenuIcon, XIcon } from "@heroicons/react/outline"; // Import MenuIcon and XIcon
import logo from "../../img/logo.png";
import cumi from "../../img/cumi_final.png";

const Sidebars = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Retrieve sidebar state from localStorage
    const storedSidebarState = localStorage.getItem("sidebarOpen");
    setIsSidebarOpen(storedSidebarState === "true" ? true : false);
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    // Store sidebar state in localStorage
    localStorage.setItem("sidebarOpen", newState.toString());
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
    alert('Logout Successful');
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          className="flex items-center justify-center p-2 bg-blue-500 rounded-full text-white"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <XIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform shadow-2xl 
        ${isSidebarOpen ? "" : "-translate-x-full"}
        sm:translate-x-0 bg-[#d2d5d9] dark:bg-gray-800 overflow-y-auto`}
        aria-label="Sidebar"
      >
        <div className="h-full pr-0 py-3">
          <img src={cumi} className="w-52 mb-4 ml-6 " />
          <ul className="space-y-4 font-medium">
            <li>
              <a
                href="/Dashboard"
                className="flex items-center dashboard_dec  p-2 text-black rounded-lg hover:bg-gray-400 group transition-all duration-300"
              >
                <VscDashboard className="w-7 h-7" />
                <h6 className="ms-3 mt-1">Dashboard</h6>
              </a>
            </li>
            <li>
              <a
                href="/Graph"
                className="flex items-center dashboard_dec  p-2 text-black rounded-lg hover:bg-gray-400 group transition-all duration-300"
              >
                <SlGraph className="w-7 h-7" />
                <span className="flex-1 ms-3 whitespace-nowrap">Graph</span>
              </a>
            </li>
            <li>
              <a
                href="/report"
                className="flex items-center dashboard_dec  p-2 text-black rounded-lg hover:bg-gray-400 group transition-all duration-300"
              >
                <TbReportAnalytics className="w-7 h-7" />
                <span className="flex-1 ms-3 whitespace-nowrap">Report</span>
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="flex items-center dashboard_dec  p-2 text-black rounded-lg hover:bg-gray-400 group transition-all duration-300"
              >
                <RiSettings4Line className="w-7 h-7" />
                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
          </ul>
          <a
            onClick={() => logout()}
            className="fixed dashboard_dec items-center left-5 bottom-10 p-2 text-black rounded-lg hover:bg-gray-400 group transition-all duration-300 flex"
          >
            <TbLogout2 className="w-7 h-7" />
            <span className="ms-3 whitespace-nowrap">Logout</span>
          </a>
          <img src={logo} className="w-52 mt-14 ml-2" />
        </div>
      </aside>
    </div>
  );
};

export default Sidebars;
