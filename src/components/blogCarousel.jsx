import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import Axios from "axios";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const BlogCarousel = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const token = localStorage.getItem("token");
  const getContent = async (data) => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser/",
        { headers: { Authorization: `Bearer: ${token}` } }
      );
      setContent(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = (id) => {
    navigate(`/detailPage/${id}`);
  };
  useEffect(() => {
    getContent();
  }, []);
  return (
    <Box p={"5%"}>
      <Heading
        mb={5}
        textAlign={"center"}
        borderRadius="full"
        as="h1"
        size="xl"
        color="white"
        bg="blue.700"
        fontWeight="bold"
      >
        From your Blog
      </Heading>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {content?.map((v, i) => {
          return (
            <SwiperSlide key={i} onClick={() => handleClick(v.id)}>
              <Image
                src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}
              ></Image>
              {/* <Text>
                {v.title}
              </Text> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};
