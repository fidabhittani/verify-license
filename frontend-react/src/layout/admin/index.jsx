import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import { Outlet, useNavigate } from "react-router";
import AdminSider from "./sider";
import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../services/user";
export default function AadminLayout() {
  const navigate = useNavigate();

  const {user, dispatchUser} = useContext(UserContext)

  const logOutMutation = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      dispatchUser({
        type: "CLEAR_USER",
      });
      navigate("../auth/login");
    },
  });




  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={()=> navigate("/")}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KP Traffic Police Management
          </Typography>
          <Button color="inherit">
            {user?.name}
          </Button>

          {user.authenticated ? (
            <Button color="inherit" onClick={() => {
              logOutMutation.mutate()
            }}>
              Logout
            </Button>
          ): <Button color="inherit" onClick={() => navigate("../auth/login")}>
          Login
        </Button>}
        </Toolbar>
      </AppBar>
      <Box>
        <Grid container spacing={2}>
          <Grid size={2}>
              <AdminSider/>
          </Grid>
          <Grid size={10} sx={{px:'1em', my:'2em'}}>
            <Outlet />

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
