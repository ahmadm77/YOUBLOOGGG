import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export const ProfileDetail = () => {
  const data = useSelector((state) => state.user.value);
  console.log(data);

  const EditSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  /* Here's a custom control */

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        phone: "",
        password: "",
      }}
      validationSchema={EditSchema}
      onSubmit={(value, actions) => {
        // console.log(value);
      }}
    >
      {({ props }) => {
        return (
          <Box as={Form}>
            <Heading textAlign={"center"}>Profile detail</Heading>
            <Stack p={"5%"}>
              <FormControl>
                <FormLabel textColor={"black"}>Username</FormLabel>
                <ErrorMessage
                  component="div"
                  name="username"
                  style={{ color: "red" }}
                />
                <Editable
                  defaultValue={data.username}
                  fontSize="md"
                  isPreviewFocusable={false}
                ></Editable>
              </FormControl>

              <FormControl>
                <FormLabel textColor={"black"}>Email</FormLabel>
                <ErrorMessage
                  component="div"
                  name="email"
                  style={{ color: "red" }}
                />
                <Editable
                  defaultValue={data.email}
                  fontSize="md"
                  isPreviewFocusable={false}
                ></Editable>
              </FormControl>

              <FormControl>
                <FormLabel textColor={"black"}>Phone number</FormLabel>
                <ErrorMessage
                  component="div"
                  name="phone"
                  style={{ color: "red" }}
                />
                <Editable
                  defaultValue={data.phone}
                  fontSize="md"
                  isPreviewFocusable={false}
                ></Editable>
              </FormControl>

              <FormControl>
                <FormLabel textColor={"black"}>Password</FormLabel>
                <ErrorMessage
                  component="div"
                  name="password"
                  style={{ color: "red" }}
                />
                <Editable
                  defaultValue={data.password}
                  fontSize="md"
                  isPreviewFocusable={false}
                ></Editable>
              </FormControl>
            </Stack>
          </Box>
        );
      }}
    </Formik>
  );
};
