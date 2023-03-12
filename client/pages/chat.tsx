import { Box } from "@chakra-ui/react";
import React from "react";
import Search from "../src/components/Search";
import { ChatState } from "../src/context/chatContext";

const chat = () => {
//   const { user, setUser } = ChatState;

  return (
    <Box bg="green.600">
      <Search />
    </Box>
  );
};

export default chat;
