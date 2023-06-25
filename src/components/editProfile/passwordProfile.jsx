import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector((state) => state.user.value);
  const toast = useToast()
  const token = localStorage.getItem("token");
  console.log(data);

  // const navigate = useNavigate();
  const onChangeIt = () => {
    // localStorage.removeItem("token");
  };

  const handleSubmit = async (data) => {
    try {
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      console.log(response);
      toast({
        title: "Change password",
        description: "You have successfully change your password.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // setTimeout(() => {
      //   navigate("/login");
      // }, 3000);
    } catch (err) {
      console.log(err);
      toast({
        title: "Edit password Error",
        description: "An error to change your password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const ChangePassSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password didn't match")
      .required("Password is required"),
  });
  return (
    <Formik
      initialValues={{
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={ChangePassSchema}
      onSubmit={(value, action) => {
        console.log(value);
        handleSubmit(value);
      }}
    >
      {(props) => {
        return (
          <Box as={Form} rounded={"lg"} boxShadow={"lg"} p={8}>
            <Heading textAlign={"center"}>Edit password</Heading>

            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Current password</FormLabel>
                <ErrorMessage
                  component="div"
                  name="currentPassword"
                  style={{ color: "red" }}
                />
                <Input
                  as={Field}
                  name="currentPassword"
                  type={showPassword ? "text" : "password"}
                />
              </FormControl>
              <FormControl>
                <FormLabel>New password</FormLabel>
                <ErrorMessage
                  component="div"
                  name="password"
                  style={{ color: "red" }}
                />
                <Input
                  as={Field}
                  name="password"
                  type={showPassword ? "text" : "password"}
                />
              </FormControl>
              <FormControl>
                <ErrorMessage
                  component="div"
                  name="confirmPassword"
                  style={{ color: "red" }}
                />
                <FormLabel>Confirm password</FormLabel>
                <Input
                  as={Field}
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                />
                <Flex justifyContent={"center"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </Flex>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isDisabled={!props.dirty}
                  onClick={onChangeIt}
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
