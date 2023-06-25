import { Box, Button, Center, Heading, Image, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MyBlog = () => {
  const [data, setData] = useState();
  const params = useParams();
  const token = localStorage.getItem("token");
  console.log(token);

  const showBlog = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setData(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await Axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload();
      // console.log(id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    showBlog();
  }, []);

  return (
    <Box
      borderWidth={"10px"}
      borderRadius="md"
      boxShadow="lg"
      borderColor={"black"}
      p={5}
    >
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
        creación de blogs
      </Heading>
      <Center gap={2}>
        {data?.map((v, i) => {
          return (
            <Box
              borderWidth={"10px"}
              borderRadius="md"
              boxShadow="lg"
              borderColor={"blackAlpha.500"}
            >
              <Box key={i} textAlign={"center"} p={"5%"}>
                {v.title}
                <Image
                  w={"200px"}
                  src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}
                ></Image>
                <Text>{v.content}</Text>
                <Text>{v.id}</Text>
              </Box>
              <Center>
                <Button
                  onClick={() => deleteBlog(v.id)}
                  colorScheme="red"
                  size="xs"
                  width="30%"
                  type="submit"
                  mb={"5%"}
                >
                  borrar
                </Button>
              </Center>
            </Box>
          );
        })}
      </Center>
    </Box>
  );
};
