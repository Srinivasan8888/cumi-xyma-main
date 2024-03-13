import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";
import Signup from "./pages/Signup";
import Graph from "./pages/Graph";
import Test from "./pages/Test";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import ProtectedRoute from "./route/ProtectedRoute";
import MainLayout from "./route/MainLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/graph" element={<Graph />} />
                <Route path="/report" element={<Report />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/test" element={<Test />} />
              </Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
