import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      background=""
      w="100%"
      bg="white"
      my="4"
      borderRadius="10"
    >
      <Text color="#7e07e0" fontSize="3xl" fontWeight="bold">
        Wee-Chat
      </Text>
    </Box>
  );
};

export default Header;
