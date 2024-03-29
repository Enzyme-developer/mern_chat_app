import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthTab = () => {
  return (
    <Tabs
      variant="solid-rounded"
      colorScheme="purple"
      bg="white"
      p="4"
      borderRadius="10"
    >
      <TabList>
        <Tab w="50%">Login</Tab>
        <Tab w="50%">Sign up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <Signup />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AuthTab;
