import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

// import required modules
import { Pagination, Navigation,Autoplay } from "swiper";
import  Axios  from "axios";
import { Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Carousel = () => {
  const navigate = useNavigate()
  const [content,setContent] = useState();
  const getContent = async(data) => {
    try {
      const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog",data)
      setContent(response.data.result);
    }
    catch (err){
      console.log(err);
    }
  }
  const handleClick = (id) => {
    navigate(`/detailPage/${id}`);
  }
  useEffect(() => {
    getContent()
  },[])
  return (
    <>
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
        {content?.map((v,i) => {
          return(
            <SwiperSlide 
            key={i}
            onClick={() => handleClick(v.id)}
            >
              <Image src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}>
              </Image>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  );
}
