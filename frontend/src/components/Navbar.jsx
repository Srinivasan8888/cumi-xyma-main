import React, { Fragment } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Box, Grid, Typography } from "@mui/material";
import { IoNotificationsCircleOutline, IoAlertCircleSharp } from "react-icons/io5";
import { Menu, Transition } from "@headlessui/react";
import Button from "react-bootstrap/Button";

const Navbar = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Box
      sx={{
        margin: "25px",
        borderRadius: "75px",
        boxShadow: 3,
        marginTop: "1px",
        marginBottom: "30px",
      }}
    >
      <AppBar
        position="static"
        sx={{ background: "#f0f1f2", p: 2, borderRadius: "35px" }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between" // Use space-between to push items to the edges
          sx={{ height: "100%" }}
        >
           <div className="flex items-center"> {/* Container for icon and text */}
            <IoAlertCircleSharp className="text-xl text-green-500 align-items-start" />
            <p className="ml-2 mt-2 text-green-500 font-bold text-base">Active</p>
          </div>

          <Typography
            variant="h4"
            fontWeight="bold"
            color="black"
            sx={{ textAlign: "center" }}
          >
            Wear Monitoring Device
          </Typography>

          <Menu as="div" className="inline-block relative items-end">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <IoNotificationsCircleOutline className="text-3xl" />
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"></Menu.Items>
            </Transition>
          </Menu>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Navbar;
