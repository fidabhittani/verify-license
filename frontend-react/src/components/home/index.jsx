import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState();
  const [isVerified, setIsVerified] = useState("");

  const onVerify = async () => {
    try {
      const response = await fetch(`/api/licenses/${search}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log({ error });
    } finally {
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
      <FormControl>
        <TextField
          id="outlined-basic"
          label="Enter License Number"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormHelperText id="my-helper-text">
          Enter your license number such "ABD-878" to search and varify
        </FormHelperText>
      </FormControl>
      ss
      <FormControl>
        <Button variant="contained" onClick={onVerify}>
          Verify
        </Button>
      </FormControl>
    </Box>
  );
};

export default Home;
