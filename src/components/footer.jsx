import { Box, Flex, Heading, Link, Icon, Input, Text, Textarea, Button, Center } from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram, FaHome, FaPhone, FaEnvelope, FaCopyright } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box >
      <Flex className="main-content" h={"100%"} w={"100%"} bgColor={"grey"}> 
        <Box className="left box" w={"50%"} p={"10px"} color={"white"}>
          <Heading mb={"10px"}>About us</Heading>
          <Box className="content">
            <Text mb={"10%"}>
            no me contactes si hay un error
            </Text>
            <Box className="social">
              <Center gap={"60px"}>
              <Link href="https://facebook.com" ><Icon as={FaFacebookF} /></Link>
              <Link href="https://twitter.com"><Icon as={FaTwitter} /></Link>
              <Link href="https://instagram.com"><Icon as={FaInstagram} /></Link>
              </Center>
            </Box>
          </Box>
        </Box>

        <Box className="center box" w={"25%"} p={"10px"} color={"white"}>
          <Heading mb={"10px"}>Address</Heading>
          <Box className="content">
            <Box className="place">
              <Icon as={FaHome} />
              <Text className="text">Lombok, Indonesia</Text>
            </Box>
            <Box className="phone">
              <Icon as={FaPhone} />
              <Text className="text">+62 -234562123</Text>
            </Box>
            <Box className="email">
              <Icon as={FaEnvelope} />
              <Text className="text">Ahmad77mawardi@gmail.com</Text>
            </Box>
          </Box>
        </Box>

        <Box className="right box" w={"25%"} p={"10px"} mx={"auto"} color={"white"}>
          <Heading mb={"10px"}>Newslater</Heading>
          <Box className="content">
            <form action="#">
              <Box className="email">
                <Text className="text">Email *</Text>
                <Input type="email" required />
              </Box>
              <Box className="msg" mb={"10px"}>
                <Text className="text">Message *</Text>
                <Textarea rows="2" cols="25" required />
              </Box>
              <Box className="btn">
                <Button type="submit" colorScheme="blue">Send</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Flex>
      <Box className="bottom">
        <Center>
          <Text className="credit">
            Created By <Link href="https://github.com/ahmadm77">Mad Unyu</Link> |
          </Text>
          <Icon as={FaCopyright} />
          <Text> 1990 All rights reserved.</Text>
        </Center>
      </Box>
    </Box>
  );
};