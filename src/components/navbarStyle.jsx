import React from "react";
import {
  Avatar,
  Flex,
  HStack,
  Text,
  Link,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import Axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

export const NavbarStyle = () => {
  const token = localStorage.getItem("token");
  const data = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=1",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const SearchSchema = Yup.object().shape({
    search: Yup.string().required("Keyword is required"),
  });

  return (
    <Formik
      initialValues={{
        search: "",
      }}
      validationSchema={SearchSchema}
      onSubmit={(value, actions) => {
        console.log(value);
        handleSubmit(value);
      }}
    >
      {(props) => {
        return (
          <Box as={Form}>
            <Flex
              as="nav"
              justify="space-between"
              alignItems={"center"}
              padding="1rem"
              bg="gray"
              color="white"
              w={"100%"}
              zIndex={"200"}
            >
              <Flex alignItems="center" mx={5}>
                <Text fontSize="4xl" fontWeight="bold">
                  <Link onClick={() => handleClick("/")}>You Blog!</Link>
                </Text>
              </Flex>
              <InputGroup size="md" h={"20%"} w={"40%"}>
                <ErrorMessage
                  component="div"
                  name="search"
                  style={{ color: "red" }}
                />

              </InputGroup>
              {token ? (
                <Box mx={5}>
                  <HStack  w={"30vw"} justify={"space-between"}>
                <Text fontSize="2xl" fontWeight="bold">
                  <Link onClick={() => handleClick("/searchResult")}>Category</Link>
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  <Link onClick={() => handleClick("/createBlog")}>Create blog</Link>
                </Text>
                  <Button
                  bg={"transparent"}
                  color={"white"}
                    h="1.75rem"
                    size="sm"
                    onClick={() => handleClick("/searchResult")}>
                    <Search2Icon boxSize={6}/>
                  </Button>
                    <Link
                      onClick={() => handleClick("/profile")}
                      mr={4}
                      align={"center"}
                    >
                      <Stack>
                        
                      <Avatar
                        src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imgProfile}`}
                        />
                  <Box>
                    <Text fontWeight={"bold"}>{data.username}</Text>
                  </Box>
                        </Stack>
                    </Link>
                
                  </HStack>
                </Box>
              ) : (
                <>
                  <HStack mr={4} verticalAlign={"center"}>
                    <Link
                      onClick={() => handleClick("/register")}
                      mr={4}
                      align={"center"}
                      fontSize="2xl" 
                      fontWeight="bold"
                    >
                      Sign Up
                    </Link>
                    <Link
                      onClick={() => handleClick("/login")}
                      mr={4}
                      align={"center"}
                      fontSize="2xl" 
                      fontWeight="bold"
                    >
                      Login
                    </Link>
                  </HStack>
                </>
              )}
            </Flex>
          </Box>
        );
      }}
    </Formik>
  );
};
