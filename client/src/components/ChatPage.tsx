import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../context/chatContext";
import Bar from "./Bar";
import Chats from "./Chats";
import ChatBox from "./ChatBox";

const Chat = () => {
  const { user, setUser } = ChatState;
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  return (
    <Box bg="" w="100%" h="100vh">
      <Bar />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="92vh"
        p="10px"
        background='blue.500'
      >
        <Chats fetchAgain={fetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </Box>
  );
};

export default Chat;
