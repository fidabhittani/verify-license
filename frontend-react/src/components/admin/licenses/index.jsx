import { Box, Button, Chip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";
import { fetchLicense } from "../../../services/license";
import moment from "moment";



const AdminLicense = () => {


    const {data, status, refetch: refetchLicenses} = useQuery({ queryKey: ['licenses'], queryFn: fetchLicense })
    const navigate = useNavigate()

  if(status === 'error'){
    return <Box>
        Error Occured
    </Box>
  }
  if(status === 'loading'){
    return <Box>
        Loading...
    </Box>
  }


  console.log(data)
  return (
    <Box>
      <Outlet context={{refetchLicenses}}/>
        <Box display={'flex'} justifyContent='space-between'>
            <Typography variant="h4">License</Typography>
            <Box variant="h4">
                <Button onClick={()=> navigate("create")}>Create</Button>
            </Box>
        </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell >CNIC</TableCell>

              <TableCell  >License No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Father Name</TableCell>
              <TableCell align="right">Issue Date</TableCell>
              <TableCell align="right">Expiry Date</TableCell>
              <TableCell align="right">Created On</TableCell>
              <TableCell align="right">Valid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.licenseNumber}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                                <TableCell>{row.cnic}</TableCell>

                <TableCell component="th" scope="row">
                  {row.licenseNumber}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.fatherName}</TableCell>
                <TableCell align="right">{moment(row.issueDate).format("LL")}</TableCell>
                <TableCell align="right">{moment(row.expiryDate).format("LL")}</TableCell>
                <TableCell align="right">{moment(row.createdAt).format("LLLL")}</TableCell>
                <TableCell align="right">

                <Chip label={moment(row.expiryDate).diff(moment(0, 'HH')) > 0 ?"Valid":"Expired"} color={
                  moment(row.expiryDate).diff(moment(0, 'HH')) > 0 ?'success':'error'

                } variant="outlined" />

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminLicense;
