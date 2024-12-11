import Box from '@mui/material/Box';
import { Outlet } from 'react-router';


export default function AuthLayout() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>Authentication</Box>
      <Box>
        <Outlet/>
      </Box>
    </Box>
  );
}