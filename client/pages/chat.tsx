import { Box } from "@chakra-ui/react";
import Search from "../src/components/Search";
import Sidebar from "../src/components/Sidebar";
import { ChatState } from "../src/context/chatContext";

const chat = () => {
  const { user, setUser } = ChatState;

  return (
    <Box bg="green.600" w='100%' h='100vh'>
      {/* <Search /> */}
      <Sidebar />
    </Box>
  );
};

export default chat;
