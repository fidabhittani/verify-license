import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField
} from "@mui/material";
import moment from "moment";
import { useState } from "react";

const VerifyLicense = () => {
  const [search, setSearch] = useState();
  const [isVerified, setIsVerified] = useState("");
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    setIsVerified("");
    setLoading(true);

    try {
      const response = await fetch(`/api/licenses/${search}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      setIsVerified(moment(json.expiryDate).diff(moment(0, 'HH')) > 0?"valid":"expired");
    } catch (error) {
      setIsVerified(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      m={"5em"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      {isVerified && (
        <Alert severity={isVerified === "valid" ? "success" : "error"}>
          {isVerified === "valid"? "Your license iss verified": "Your license is expired"}
        </Alert>
      )}
      <FormControl m={4}>
        <TextField
          id="outlined-basic"
          label="Enter License Number"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormHelperText id="my-helper-text">
          Enter your license number such &quote;ABD-989&quote; to search and varify
        </FormHelperText>
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={onVerify} disabled={loading}>
          Verify
        </Button>
      </FormControl>
    </Box>
  );
};

export default VerifyLicense;
