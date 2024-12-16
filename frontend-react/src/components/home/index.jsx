import { Box, Icon, Typography } from "@mui/material";

import "./styles.scss";
import AppCarousal from "./carousal/Index";

const Home = () => {
  return (
    <Box class="home-page">
      <Box id="head-box" class="head-box">
        <Box class="headings-bg"></Box>
        <Box class="headings-layover"></Box>
        <Box class="headings">
          <Typography fontSize={"2.5em"}>
            CITY TRAFFIC POLICE PESHAWAR
          </Typography>
          <Typography fontSize={"2em"}>
            Educate - Facilitate - Regulate
          </Typography>
        </Box>
      </Box>

      <Box class="tiles-box">
        <Box class="tile tile-red">
          <figure>
            <img
              decoding="async"
              width="50"
              height="35"
              src="https://ptpkp.gov.pk/wp-content/uploads/2023/08/Regular-Driving-Licence.png"
              alt="search challan 1 Peshawar Traffic Police"
              title="Peshawar Traffic Police 2"
            />
          </figure>

          <Typography>Driving License Verification</Typography>
        </Box>
        <Box class="tile tile-red">
          <figure>
            <img
              decoding="async"
              width="50"
              height="35"
              src="https://ptpkp.gov.pk/wp-content/uploads/2023/08/search-challan-1.png"
              alt="search challan 1 Peshawar Traffic Police"
              title="Peshawar Traffic Police 2"
            />
          </figure>

          <Typography>Driving License Verification</Typography>
        </Box>
        <Box class="tile tile-blue">
          <figure>
            <img
              decoding="async"
              width="50"
              height="35"
              src="https://ptpkp.gov.pk/wp-content/uploads/2023/08/Regular-Driving-Licence.png"
              alt="search challan 1 Peshawar Traffic Police"
              title="Peshawar Traffic Police 2"
            />
          </figure>

          <Typography>Driving License Verification</Typography>
        </Box>
        <Box class="tile tile-blue">
          <figure>
            <img
              decoding="async"
              width="50"
              height="35"
              src="https://ptpkp.gov.pk/wp-content/uploads/2023/08/Regular-Driving-Licence.png"
              alt="search challan 1 Peshawar Traffic Police"
              title="Peshawar Traffic Police 2"
            />
          </figure>

          <Typography>Overseas License</Typography>
        </Box>
        <Box class="tile tile-blue">
          <figure>
            <img
              decoding="async"
              width="50"
              height="35"
              src="https://ptpkp.gov.pk/wp-content/uploads/2023/08/Renewal-of-Licence.png"
              alt="search challan 1 Peshawar Traffic Police"
              title="Peshawar Traffic Police 2"
            />
          </figure>

          <Typography fontSize={"16px"}>License Procedure</Typography>
        </Box>
      </Box>

      <Box class="content">
        <Box display="flex" gap={4}>
          <Box sx={{borderRadius:'1em'}}>
            <img
              loading="lazy"
              decoding="async"
              width="400"
              src="https://ptpkp.gov.pk/wp-content/uploads/2023/08/traffic-pkp-1024x683.jpg"
              alt="traffic pkp Peshawar Traffic Police"
              title="Peshawar Traffic Police 6"
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="h4">Overview</Typography>

            <Typography>
              The Khyber Pakhtunkhwa Traffic Police operates with a mission to
              ensure safe, orderly, and efficient traffic flow within the city.
              By prioritizing public education, they empower citizens with
              knowledge about traffic laws. Their visionary approach aims to
              minimize manpower deployment while maximizing traffic management
              efficacy, leading to smoother commutes. Embracing modern
              technology, they seek to employ advanced gadgets for precise
              regulation and enforcement. Ultimately, Khyber Pakhtunkhwa Traffic
              Police envisions a future where a well-informed populace,
              streamlined traffic, and cutting-edge solutions merge to create a
              harmonious urban mobility landscape.
            </Typography>
          </Box>
        </Box>
        <AppCarousal/>
      </Box>
    </Box>
  );
};

export default Home;
