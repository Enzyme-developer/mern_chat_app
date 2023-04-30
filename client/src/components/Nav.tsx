import React, { useContext } from "react";
import { Avatar, Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ChatContext, ChatState } from "../context/chatContext";
import ProfileModal from "./modals/ProfileModal";
import { useRouter } from "next/router";
import { getSender } from "../utils/chatLogic";
// @ts-ignore
import NotificationBadge, { Effect } from "react-notification-badge";

type disclosureProps = {
  onOpen?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
};

const Nav = ({ onOpen }: disclosureProps) => {
  const router = useRouter();
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = useContext(ChatContext);

  const logoutHandler = () => {
    localStorage.removeItem("uesrInfo");
    router.push("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px"
      borderWidth="5px"
      h="fit-content"
    >
      <Tooltip
        hasArrow
        label="Search for users"
        arrowSize={15}
        placement="bottom"
      >
        <Button variant="ghost" onClick={onOpen}>
          <SearchIcon mr="2" />
          <Text display={{ base: "none", md: "flex" }}>Search user</Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl" fontWeight="semibold">
        Wee-Chat
      </Text>

      <div>
        <Menu>
          <MenuButton>
            <div style={{position: 'relative'}}>
              <BellIcon fontSize="2xl" m="1" />
              <div style={{ position: 'relative' }}>
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
                />
              </div>
            </div>
          </MenuButton>
          <MenuList px={2}>
            {/* <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            /> */}
            {!notification.length && "No New Messages"}
            {notification.map((notif: any) => (
              <MenuItem
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n: any) => n !== notif));
                }}
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${getSender(user, notif.chat.users)}`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user?.name}
                  src={user?.picture}
                />
              </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </div>
    </Box>
  );
};

export default Nav;
