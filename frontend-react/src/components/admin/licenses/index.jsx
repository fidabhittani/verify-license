import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
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

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdminLicense = () => {
  const {
    data, error,
    isError,
    isLoading,
    refetch: refetchLicenses,
  } = useQuery({ queryKey: ["licenses"], queryFn: fetchLicense });
  const navigate = useNavigate();

  if (isError) {
    return (
      <Box>
        <Alert variant="error">{error.message || 'Error Occured while fetching'}</Alert>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Outlet context={{ refetchLicenses }} />
      <Box display={"flex"} justifyContent="space-between">
        <Typography variant="h4">License</Typography>
        <Box variant="h4">
          <Button onClick={() => navigate("create")}>Create</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>CNIC</TableCell>

              <TableCell>License No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Father Name</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Intl Driving Permit</TableCell>

              <TableCell>Valid</TableCell>
              <TableCell>Actions</TableCell>
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
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.fatherName}</TableCell>
                <TableCell >{row.district}</TableCell>
                <TableCell >
                  {moment(row.issueDate).format("llll")}
                </TableCell>
                <TableCell >
                  {moment(row.expiryDate).format("llll")}
                </TableCell>
                <TableCell >
                  {moment(row.createdAt).format("llll")}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.internationalDrivingPermit ? "Yes" : "No"}
                    color={row.internationalDrivingPermit ? "success" : "error"}
                    variant="outlined"
                  />
                </TableCell>

                <TableCell >
                  <Chip
                    label={
                      moment(row.expiryDate).diff(moment(0, "HH")) > 0
                        ? "Valid"
                        : "Expired"
                    }
                    color={
                      moment(row.expiryDate).diff(moment(0, "HH")) > 0
                        ? "success"
                        : "error"
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell >
                  <Stack  direction={'row'}>
                    <IconButton aria-label="delete" color='error' onClick={()=> navigate(`confirmation/${row._id}`)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" color='info' onClick={()=> navigate(`create/${row._id}`)}>
                      <EditIcon />
                    </IconButton>
                  </Stack>
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
