import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Outlet, useNavigate } from "react-router";
import TopBarStrip from "./top-bar-strip";

export default function AppLayout() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopBarStrip>
        <Box sx={{ mx: "15em" }}>
          <marquee direction="center">
            Admission Open at Traffic Driving School . For more information call
            Helpline 1915
          </marquee>
        </Box>
      </TopBarStrip>
      <AppBar position="static" color="inherit">
        <Box sx={{ mx: "15em" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => navigate("")}
            >
              <img
                src="https://ptpkp.gov.pk/wp-content/uploads/elementor/thumbs/Logo-header-qqjzbizhx5ivwdtlft6s200uoz6u5ux16tsuzx90q6.png"
                title="Logo-header"
                alt="Logo-header"
                loading="lazy"
              ></img>
            </Typography>

            <Button color="inherit" onClick={() => navigate("home")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("services")}>
              Services
            </Button>
            <Button color="inherit" onClick={() => navigate("driving-license")}>
              Driving License
            </Button>
            <Button color="inherit" onClick={() => navigate("media")}>
              Media
            </Button>
            <Button color="inherit" onClick={() => navigate("downloads")}>
              Downloads
            </Button>
            <Button color="inherit" onClick={() => navigate("about-us")}>
              About us
            </Button>
            <Button color="inherit" onClick={() => navigate("contact-us")}>
              Contact Us
            </Button>
            <Button color="inherit" onClick={() => navigate("../admin")}>
              Admin
            </Button>
          </Toolbar>
        </Box>
      </AppBar>
      <Box sx={{ mx: "18em", my:'1em' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
