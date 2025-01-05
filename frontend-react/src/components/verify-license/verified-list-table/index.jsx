import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Chip } from "@mui/material";

export default function VerifiedListTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>CNIC</TableCell>

            <TableCell>License No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Father Name</TableCell>
            <TableCell>Issue Date</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Intl License Permit</TableCell>
            <TableCell>Valid</TableCell>
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
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.fatherName}</TableCell>
              <TableCell>
                {moment(row.issueDate).format("LL")}
              </TableCell>
              <TableCell>
                {moment(row.expiryDate).format("LL")}
              </TableCell>
              <TableCell>
                {moment(row.createdAt).format("LLLL")}
              </TableCell>
              <TableCell>
                <Chip
                  label={row.internationalDrivingPermit ? "Yes" : "No"}
                  color={row.internationalDrivingPermit ? "success" : "error"}
                  variant="outlined"
                />
              </TableCell>

              <TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
