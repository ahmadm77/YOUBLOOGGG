import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Image, List, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const ViewLike = () => {
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const [data, setData] = useState();
  const params = useParams();
  const getDetail = async (data) => {
    try {
      const response = await axios.get(
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
    fetchLikedBlogs();
    getDetail()
  }, []);

  const fetchLikedBlogs = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result;
      setLikedBlogs(data);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the liked blogs.");
    }
  };

  console.log("Liked Blogs:", likedBlogs);

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
        You like it!
      </Heading>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <List>
          {likedBlogs?.map((blog) => {
            return (
              <Box
                borderWidth={"10px"}
                borderRadius="md"
                boxShadow="lg"
                borderColor={"blackAlpha.500"}
                p={"5%"}
                mb={"5%"}
                
              >
                <Box key={blog.id} textAlign={"center"}>
                  <Image
                    src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imageURL}`}
                  />
                  {/* {blog.Blog.imageUrl} */}
                  <Heading>{blog.Blog.title}</Heading>
                  {blog.Blog.content}
                </Box>
              </Box>
            );
          })}
        </List>
      )}
    </Box>
  );
};
