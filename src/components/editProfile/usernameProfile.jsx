import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const ChangeUsername = () => {
  const data = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token");
  const toast = useToast();
  console.log(data);

  const navigate = useNavigate();
  const onChangeIt = () => {
    localStorage.removeItem("token");
  };

  const handleSubmit = async (data) => {
    console.log(data);
    try {
      data.FE_URL = window.location.origin;
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      console.log(response);
      toast({
        title: "Edit username Success",
        description: "You have successfully changed your username.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast({
        title: "Edit username Error",
        description: "An error to changed your username.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const ChangeUserSchema = Yup.object().shape({
    currentUsername: Yup.string().required("Your current username is required"),
    newUsername: Yup.string().required("Please enter your new username"),
  });
  return (
    <Formik
      initialValues={{
        currentUsername: "",
        newUsername: "",
      }}
      validationSchema={ChangeUserSchema}
      onSubmit={(value, action) => {
        console.log(value);
        handleSubmit(value);
      }}
    >
      {(props) => {
        return (
          <Box as={Form} rounded={"lg"} boxShadow={"lg"} p={8}>
            <Heading textAlign={"center"}>Username</Heading>

            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Current username</FormLabel>
                <ErrorMessage
                  component="div"
                  name="currentUsername"
                  style={{ color: "red" }}
                />
                <Input as={Field} name="currentUsername" />
              </FormControl>

              <FormControl>
                <FormLabel>New username</FormLabel>
                <ErrorMessage
                  component="div"
                  name="newUsername"
                  style={{ color: "red" }}
                />
                <Input as={Field} name="newUsername" />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={onChangeIt}
                  // isDisabled={!props.dirty}
                  type={"submit"}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Change it!
                </Button>
              </Stack>
            </Stack>
          </Box>
        );
      }}
    </Formik>
  );
};
