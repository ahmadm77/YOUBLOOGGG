import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast()
  const { token } = useParams();
  const SeePsw = () => {
    setShowPassword(!showPassword);
  };

  const RegisSchema = Yup.object().shape({

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .min(10, "Phone number must be at least 10 characters")
      .required("Phone number is required"),

    username: Yup.string().required("Username is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password didn't match")
      .required("Password is required"),
  });
  const handleSubmit = async (data) => {
    data.FE_URL = "https://ahmad-minpro1.netlify.app";
    try {
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Verify account",
        description: "Please check your email",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "An error occurred while creating the blog.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisSchema}
      onSubmit={(value, action) => {
        console.log(value);
        handleSubmit(value);
        // action.resetForm();
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
            bgColor={"gray"}
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
                crear una nueva cuenta
                </Heading>
                <FormControl>
                  <FormLabel textColor={"white"}>dirección de correo electrónico</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="correo electrónico"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel textColor={"white"}>número de teléfono</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="phone"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
                <FormControl>
                  <FormControl>
                    <FormLabel textColor={"white"}>nombre de usuario</FormLabel>
                    <ErrorMessage
                      component="div"
                      name="username"
                      style={{ color: "red" }}
                    />
                    <Input
                      as={Field}
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      mb={4}
                      bgColor={"white"}
                    />
                  </FormControl>
                  <FormLabel textColor={"white"}>contraseña</FormLabel>
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

                  <FormLabel textColor={"white"}>
                  confirmar Contraseña
                  </FormLabel>
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
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
                  mostrar contraseña
                </Checkbox>
              </Box>
              <Button colorScheme="blue" size="lg" width="full" type="submit">
                  inscribirse
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
