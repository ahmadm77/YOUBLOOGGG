import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setValue } from "../../redux/userSlice";

export const PhoneLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast()
  const onLogin = async (data) => {
    try {
      const response = await Axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/auth/login`,
        data
      );
      console.log(response.data.token);
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
      console.log(err);
      toast({
        title: "Login Error",
        description: "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const SeePsw = () => {
    setShowPassword(!showPassword);
  };
  const LoginSchema = Yup.object().shape({
    phone: Yup.string()
      .min(10, "Phone number must be at least 10 digit")
      .required("Phone number is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
  });
  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(value, actions) => {
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
                <Flex justifyContent="center">
                  <Heading
                    mb={6}
                    textAlign="center"
                    textColor={"white"}
                    size={"4xl"}
                  >
                    <AiOutlinePhone />
                  </Heading>
                </Flex>
                <FormControl>
                  <FormLabel textColor={"white"}>Phone number</FormLabel>
                  <Stack spacing={4}>
                    <ErrorMessage
                      component="div"
                      name="phone"
                      style={{ color: "red" }}
                    />
                    <InputGroup>
                      <InputLeftAddon children="+62" />
                      <Input
                        as={Field}
                        name="phone"
                        type="number"
                        placeholder=" Enter your phone number"
                        color={"white"}
                      />
                    </InputGroup>
                  </Stack>
                </FormControl>
                <FormControl>
                  <FormLabel textColor={"white"}>Password</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type={showPassword ? "text" : "password"}
                    name="password"
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
                    <Link href="/pswForgot" isExternal color={"white"}>
                      Forgot password? <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Flex>
                  <Flex>
                    <Link href="/register" isExternal color={"white"}>
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
