import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import { Outlet } from "react-router";
import AdminSider from "./sider";

export default function AadminLayout() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit">Logout</Button>
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
