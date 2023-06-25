import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import Axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

export const ResetPsw = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const SeePsw = () => {
    setShowPassword(!showPassword);
  };
  const ResetSchema = Yup.object().shape({
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
    data.FE_URL = window.location.origin
    try {
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/login");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={ResetSchema}
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
            bgColor={"black"}
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
                  Create new password
                </Heading>
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
                <FormControl>
                  <FormLabel textColor={"white"}>
                    Cofirm your password
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
                  Show Password
                </Checkbox>
              </Box>
              <Button colorScheme="blue" size="lg" width="full" type="submit">
                Change it!
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
