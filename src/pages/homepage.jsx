import {
  Box,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Carousel } from "../components/carousel";
import Axios from "axios";
import { useEffect, useState } from "react";
import { FavPop } from "../components/favPop";
import { Pagination } from "../components/pagination";
import { BlogCarousel } from "../components/blogCarousel";

export const HomePage = () => {
  const [blog, setBlog] = useState([]);
  const [fav, setFav] = useState([]);
  const getMost = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav"
      );
      setFav(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const getBlog = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/"
      );
      setBlog(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMost();
    getBlog();
  }, []);
  return (
    <Box p={"20px"}>
      <Box>
          <Flex justifyContent={"center"} mx={"auto"}
            h={"70vh"}
            w={"75vw"}
            border={"2px"}
            borderWidth={"10px"}
            borderRadius="md"
            boxShadow="lg"
            mb={"5px"}
          >
            <Carousel />
          </Flex>
          <Center gap={"2%"}>
            <Box
            h={"70vh"}
            w={"50vw"}
            border={"2px"}
            borderWidth={"10px"}
            borderRadius="md"
            boxShadow="lg"
            >
              <BlogCarousel/>
            </Box>
            <FavPop />
          </Center>
      </Box>
      <Box>
        <Center>
          <Box h={"100%"} w={"75%"}>
            <Center gap={"10px"} m={"10px"}>
              <Pagination/>
            </Center>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};
