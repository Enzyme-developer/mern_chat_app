import { Box } from "@chakra-ui/react";
import { useState } from "react";
import MyChats from "../src/components/Chats";
import Sidebar from "../src/components/Sidebar";
import { ChatState } from "../src/context/chatContext";

const chat = () => {
  const { user, setUser } = ChatState;
//   const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  return (
    <Box bg="green.600" w="100%" h="100vh">
      <Sidebar />
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
              <MyChats
                //   fetchAgain={fetchAgain}
              />
      </Box>
    </Box>
  );
};

export default chat;
