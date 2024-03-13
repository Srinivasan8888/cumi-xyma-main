import React, { useState } from "react";
import { VscDashboard } from "react-icons/vsc";
import { TbReportAnalytics, TbLogout2 } from "react-icons/tb";
import { SlGraph } from "react-icons/sl";
import { RiSettings4Line } from "react-icons/ri";
import logo from "../img/logo4.png";
import cumi from "../img/cumi_final.png";



const Sidebars = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
    alert('Logout Successful');
}
  return (
    <div>
      {/* <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 p-2 text-white rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 z-50"
      >
        {isSidebarOpen ? "Collapse" : "Expand"}
      </button> */}
      
      <aside
        
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        } sm:translate-x-0 bg-[#030637] dark:bg-gray-800 overflow-y-auto`}
        aria-label="Sidebar"
      >
        <div className="h-full pr-0 py-20">
        <img src={cumi} className="w-44 mb-4 ml-6" />
          <ul className="space-y-4 font-medium">
            <li>
              <a
                href="/Dashboard"
                className="flex items-center dashboard_dec  p-2 text-white rounded-lg hover:bg-gray-700 group transition-all duration-300"
              >
                <VscDashboard className="w-7 h-7" />
                <h6 className="ms-3 mt-1">Dashboard</h6>
              </a>
            </li>
            <li>
              <a
                href="/Graph"
                className="flex items-center dashboard_dec  p-2 text-white rounded-lg hover:bg-gray-700 group transition-all duration-300"
              >
                <SlGraph className="w-7 h-7" />
                <span className="flex-1 ms-3 whitespace-nowrap">Graph</span>
              </a>
            </li>
            <li>
              <a
                href="/report"
                className="flex items-center dashboard_dec  p-2 text-white rounded-lg hover:bg-gray-700 group transition-all duration-300"
              >
                <TbReportAnalytics className="w-7 h-7" />
                <span className="flex-1 ms-3 whitespace-nowrap">Report</span>
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="flex items-center dashboard_dec  p-2 text-white rounded-lg hover:bg-gray-700 group transition-all duration-300"
              >
                <RiSettings4Line className="w-7 h-7" />
                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
          </ul>
          <a
            onClick={() => logout()}
            className="fixed dashboard_dec items-center left-5 bottom-10 p-2 text-white rounded-lg hover:bg-gray-700 group transition-all duration-300 flex"
          >
            <TbLogout2 className="w-7 h-7" />
            <span className="ms-3 whitespace-nowrap">Logout</span>
          </a>
          <img src={logo} className="w-32 mt-4 ml-10" />
        </div>
        
      </aside>
    </div>
  );
};

export default Sidebars;


// import React from 'react'
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

// export const Sidebars = () => {
//   return (
//     <Sidebar>
//     <Menu>
//       <SubMenu label="Charts">
//         <MenuItem> Pie charts </MenuItem>
//         <MenuItem> Line charts </MenuItem>
//       </SubMenu>
//       <MenuItem> Documentation </MenuItem>
//       <MenuItem> Calendar </MenuItem>
//     </Menu>
//   </Sidebar>
//   )
// }
