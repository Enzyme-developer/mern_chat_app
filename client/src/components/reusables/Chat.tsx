import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { getSender } from "../../utils/chatLogic";

const Chat = ({ chat, selectedChat, setSelectedChat, loggedUser }: any) => {
  return (
    <Box
      onClick={() => setSelectedChat(chat)}
      cursor="pointer"
      bg={selectedChat === chat ? "blue.500" : "#E8E8E8"}
      color={selectedChat === chat ? "white" : "black"}
      px={3}
      py={2}
      borderRadius="lg"
      key={chat._id}
    >
      <Box display="flex" py={2}>
        <Avatar
          size="xs"
          cursor="pointer"
          name={chat?.users[1]?.name}
          src={chat?.users[1]?.picture}
          marginRight="3"
        />
        <Text fontWeight="600">
          {!chat.isGroupChat
            ? getSender(loggedUser, chat.users)
            : chat.chatName}
        </Text>
      </Box>

      {chat.latestMessage && (
        <Text fontSize="xs">
          <b>
            {chat.latestMessage.sender.name == loggedUser.name
              ? "You"
              : `${chat.latestMessage.sender.name}`}{" "}
            :{" "}
          </b>
          {chat.latestMessage.content.length > 50
            ? chat.latestMessage.content.substring(0, 50) + "..."
            : chat.latestMessage.content}
        </Text>
      )}
    </Box>
  );
};

export default Chat;
