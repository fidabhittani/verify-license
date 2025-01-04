import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Outlet, useNavigate } from "react-router";
import { UserContext } from "../../contexts/user";
import TopBarStrip from "./top-bar-strip";

export default function AppLayout() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);

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
            {user.authenticated ? (
              <Button color="inherit" onClick={() => navigate("../admin")}>
                Admin
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => navigate("../auth/login")}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Box>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
