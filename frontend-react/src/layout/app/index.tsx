import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function AppLayout() {
    const navigate = useNavigate()
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
            KP Driving License Verification
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit" onClick={()=> navigate('../admin')}>Admin</Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet/>
      </Box>
    </Box>
  );
}