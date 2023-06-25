import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { AiFillMail, AiFillPhone, AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setValue } from "../../redux/userSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast()
  const dispatch = useDispatch();
  const onLogin = async (data) => {
    try {
      const response = await Axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/auth/login`,
        data
      );
      localStorage.setItem("token", response.data.token);
      const { username, email, phone, imgProfile } =
        response.data.isAccountExist;
      dispatch(setValue({ username, email, phone, imgProfile }));
      console.log(response.data.isAccountExist);
      toast({
        title: "Login Success",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      toast({
        title: "Login Error",
        description: "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const SeePsw = () => {
    setShowPassword(!showPassword);
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(value, action) => {
        console.log(value);
        onLogin(value);
      }}
    >
      {({ props }) => {
        return (
          <Box
            as={Form}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgColor={"grey"}
          >
            <Box
              p={8}
              maxWidth="500px"
              borderWidth={"20px"}
              borderRadius="md"
              boxShadow="lg"
            >
              <Box>
                <Heading mb={6} textAlign="center" textColor={"white"}>
                  Login to your account
                </Heading>
                <Box className="social" color={"white"}>
                  <Text textAlign={"center"} mb={3}>
                    Choose how to sign you in
                  </Text>
                  <Center gap={"60px"} mb={6}>
                    <Link href="/login">
                      <Icon as={AiFillMail} />
                    </Link>
                    <Link href="/userLogin">
                      <Icon as={AiOutlineUser} />
                    </Link>
                    <Link href="/phoneLogin">
                      <Icon as={AiFillPhone} />
                    </Link>
                  </Center>
                </Box>
                <FormControl id="email">
                  <FormLabel textColor={"white"}>Email Address</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="email"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel textColor={"white"}>Password</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
                <Checkbox
                  textColor={"white"}
                  isChecked={showPassword}
                  onChange={SeePsw}
                  mb={4}
                >
                  Show Password
                </Checkbox>
              </Box>
              <Box mb={4}>
                <Flex gap={"60px"} justifyContent={"center"}>
                  <Flex>
                    <Link href="/pswForgot" color={"white"}>
                      Forgot password? <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Flex>
                  <Flex>
                    <Link href="/register" color={"white"}>
                      Create account <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Flex>
                </Flex>
              </Box>
              <Button colorScheme="blue" size="lg" width="full" type="submit">
                Sign In
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
