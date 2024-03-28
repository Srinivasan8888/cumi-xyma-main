import React from "react";
import Sidebars from "../components/Sidebar/Sidebars";
import { Card } from "flowbite-react";

const Settings = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <Card
          className="max-w-sm text-center"
          style={{ textDecoration: "none" }}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            XYMA Analytics Private Ltd <br />
            IIT Madras Research Park
          </h5>
          <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            The Wear Monitoring Device (WMD) monitors the wear of ceramic
            linings in industrial plant operations
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            This Device is battery-powered and braodcast the percentage of the
            remaining wall thickness to the dashboard via the Industrial
            Internet of Things (IIoT) module
          </p>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Contact Information:
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Mail: info@xyma.in <br />
            ©2023 XYMA Analytics Private Ltd
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
