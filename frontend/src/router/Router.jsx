import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import Graph from "../pages/Graph";
import Test from "../pages/Test";
import Report from "../pages/Report";
import Settings from "../pages/Settings";
import Admin from "../pages/Admin";
import Layout from "./Layout";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="graph" element={<Graph />} />
            <Route path="report" element={<Report />} />
            <Route path="settings" element={<Settings />} />
            <Route path="admin" element={<Admin />} />
            <Route path="test" element={<Test />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
