import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FavPop } from "../components/favPop";
import { Like } from "../components/Like/buttonLike";

export const DetailPage = () => {
  const [data, setData] = useState();
  const params = useParams();
  const getDetail = async (data) => {
    try {
      const response = await Axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`,
        data
      );
      setData(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  useEffect(() => {
    getDetail();
  }, []);
  console.log(data);
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
              The content
              </Heading>
      <Flex justifyContent={"center"} gap={"5%"}>
        <Box>
          <Stack spacing={5}>

          <Box
            border={"1px"}
            maxWidth="500px"
            borderWidth={"5px"}
            borderRadius="md"
            boxShadow="lg"
            textAlign={"center"}
          >

            <Heading>{data?.title}</Heading>
          </Box>
          <Box
            p={"2%"}
            border={"1px"}
            maxWidth="500px"
            borderWidth={"5px"}
            borderRadius="md"
            boxShadow="lg"
            >
            <Image
              src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imageURL}`}
              />
          </Box>
          <Box
          p={"2%"}
          border={"1px"}
          maxWidth="500px"
          borderWidth={"5px"}
          borderRadius="md"
          boxShadow="lg"
          >
              <Text>{data?.User.username}</Text>
              <Text>{data?.createdAt}</Text>
          </Box>
          <Box
          p={"2%"}
          border={"1px"}
          maxWidth="500px"
          borderWidth={"5px"}
          borderRadius="md"
          boxShadow="lg"
          >
            <Text>{data?.content}</Text>


          </Box>
          <Like />
            </Stack>
        </Box>
        <Box>
          <FavPop />
        </Box>
      </Flex>
    </Box>
  );
};
