import React from "react";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import "./css/dashboard.css";
import Sidebars from "../components/Sidebars.jsx";

function Dashboard() {
  return (
    <div className="h-fit flex flex-col">
      <Sidebars />
      <div className="p-4 sm:ml-64 ">
        <Navbar />
        <Card />
      </div>
    </div>
  );
}

export default Dashboard;
