import React, { Fragment } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Box, Grid, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
          justifyContent="center" // Add this line to center the content horizontally
          sx={{ height: "100%" }} // Add this line to center the content vertically
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="black"
            sx={{ textAlign: "center" }}
          >
            Wear Monitoring Device
          </Typography>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Navbar;
