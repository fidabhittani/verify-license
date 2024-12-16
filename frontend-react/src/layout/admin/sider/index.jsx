import DraftsIcon from '@mui/icons-material/Drafts';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import SendIcon from '@mui/icons-material/Send';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {  useNavigate } from 'react-router';


export default function AdminSider() {
    const navigate = useNavigate()
  return (
    <Card sx={{ height: 'calc(100vh - 4.5em)' }} variant='outlined'>
      <MenuList>
        <MenuItem onClick={()=> navigate("")}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">License</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PriorityHighIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">User</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Other
          </Typography>
        </MenuItem>
      </MenuList>
    </Card>
  );
}