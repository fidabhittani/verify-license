import { Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import banner_1 from "./images/slid-0002-768x360.jpg";
import banner_2 from "./images/slid-0003-768x360.jpg";
import banner_3 from "./images/slid-0004-768x360.jpg";
import banner_4 from "./images/slid-0005-768x360.jpg";
import banner_5 from "./images/slid-0006-768x360.jpg";
import banner_6 from "./images/slid-0007-768x360.jpg";
import banner_7 from "./images/slid-0008-768x360.jpg";

const AppCarousal = () => {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      bannerImage: banner_1,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      bannerImage: banner_2,
    },
    {
      name: "Random Name #3",
      description: "Another banner here!",
      bannerImage: banner_3,
    },
    {
      name: "Random Name #3",
      description: "Another banner here!",
      bannerImage: banner_4,
    },
    {
      name: "Random Name #3",
      description: "Another banner here!",
      bannerImage: banner_5,
    },
    {
      name: "Random Name #3",
      description: "Another banner here!",
      bannerImage: banner_6,
    },
    {
      name: "Random Name #3",
      description: "Another banner here!",
      bannerImage: banner_7,
    },
  ];

  return (
    <Carousel autoPlay interval={2000} animation="slide" indicators={false}>
      {items.map((item, index) => (
        <Paper key={index} style={{ textAlign: "center", padding: "10px" }}>
          <img
            src={item.bannerImage}
            alt={item.name}
            style={{ width: "100%", height: "auto" }}
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default AppCarousal