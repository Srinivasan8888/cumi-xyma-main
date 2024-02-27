import React, { Fragment } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Box, Grid, Typography } from "@mui/material";
import {
  IoNotificationsCircleOutline,
  IoAlertCircleSharp,
} from "react-icons/io5";
import { Menu, Transition } from "@headlessui/react";

const Navbar = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Box
      sx={{
        margin: "4px",
        borderRadius: "50px",
        boxShadow: 3,
        marginBottom: "10px",
        marginTop: "-10px",
      }}
    >
      <AppBar
        position="static"
        sx={{ background: "#f0f1f2", p: 1, borderRadius: "25px" }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "40px" }}
        >
          <div className="flex items-center">
            <IoAlertCircleSharp className="text-lg text-green-500 align-items-start" />
            <p className="ml-1 flex text-green-500 font-bold text-sm h-1">
              Active
            </p>
          </div>

          <Typography
            variant="h6" // Reduced font size
            fontWeight="bold"
            color="black"
            sx={{ textAlign: "center" }}
          >
            Wear Monitoring Device
          </Typography>

          <Menu as="div" className="inline-block relative items-end mr-4">
            <div>
              <Menu.Button className="inline-flex justify-center gap-x-1 rounded-full bg-white p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <IoNotificationsCircleOutline className="text-xl" />
              </Menu.Button>
            </div>
           
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-1 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"></Menu.Items>
            </Transition>
          </Menu>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Navbar;
