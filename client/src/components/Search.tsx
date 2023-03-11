import React from "react";
import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

const Search = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px"
      borderWidth="5px"
    >
      <Tooltip
        hasArrow
        label="Search for users"
        arrowSize={15}
        placement="auto"
      >
        <Button variant="ghost">
          <Text display={{ base: "none", md: "flex" }}>Search user</Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl" fontWeight="semibold">
        Wee-Chat
      </Text>

      <div>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<BellIcon />}
              >
                {isOpen ? "Close" : "Open"}
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem onClick={() => alert("Kagebunshin")}>
                  Create a Copy
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </div>
    </Box>
  );
};

export default Search;
