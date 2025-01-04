import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  TextField
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import VerifiedListTable from "./verified-list-table";
import { searchByLicense } from "../../services/license";
import { useQuery } from "@tanstack/react-query";

const VerifyLicense = () => {
  const [search, setSearch] = useState();
  const [isVerified, setIsVerified] = useState("");
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(undefined);



    const { data, error, isError, isLoading, refetch } = useQuery({
      queryKey: ["ssearchLiccenseByPlateOrCNIC", search],
      queryFn: async () => {
        const data = await searchByLicense(search);
        return data;
      },
      enabled: false,
    });
  


  const onVerify = () => {
      refetch();
  };

  return (
    <Box
      m={"5em"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      {isError && (
        <Alert severity={"error"}>
          {error.message || "Error Occured while fetching"}
        </Alert>
      )}
      {isLoading && <Alert severity={"info"}>Loading...</Alert>}
      <FormControl m={4}>
        <TextField
          id="outlined-basic"
          label="Enter License Number OR CNIC"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormHelperText id="my-helper-text">
          Enter your license number such (ABD-989) to search and varify
        </FormHelperText>
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={onVerify} disabled={loading}>
          Verify
        </Button>
      </FormControl>
      <Divider/>
      {data && <VerifiedListTable data={[data]}/>}
    </Box>
  );
};

export default VerifyLicense;
