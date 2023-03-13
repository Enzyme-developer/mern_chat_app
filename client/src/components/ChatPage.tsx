import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../context/chatContext";
import Bar from "./Bar";
import Chats from "./Chats";

const Chat = () => {
  const { user, setUser } = ChatState;
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  return (
    <Box bg="green.600" w="100%" h="100vh">
      <Bar />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        <Chats fetchAgain={fetchAgain} />
      </Box>
    </Box>
  );
};

export default Chat;
