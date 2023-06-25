import React from "react";
import { Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Like = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(token);
  console.log(id);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleLike = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    const data = {
      BlogId: id,
    };

    try {
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/like",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      );
      console.log(response.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Formik>
        <Button colorScheme="blue" size="lg"  onClick={handleLike}>
          Like it!
        </Button>
      </Formik>
    </Box>
  );
};