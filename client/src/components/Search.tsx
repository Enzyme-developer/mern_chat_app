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
import ProfileModal from "./ProfileModal";
import { useRouter } from "next/router";

const Search = ({onOpen}: any) => {
  const router = useRouter();
    const { user } = useContext(ChatContext);
    
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
        placement="auto"
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
            <BellIcon fontSize="2xl" m="1" />
          </MenuButton>
          {/* <MenuList></MenuList> */}
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
                  src={user?.pic}
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

export default Search;
