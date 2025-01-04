import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router';


export default function AuthLayout() {
  return (
    <Container maxWidth="sm" sx={{ flexGrow: 1,

      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column'}}>
      <Typography variant='h5' color='#a9a9ff'>KP Traffic Police</Typography>
      <Box>
        <Outlet/>
      </Box>
    </Container>
  );
}