import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "./reusables/ChatLoader";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./modals/ProfileModal";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
import { getSender } from "../utils/chatLogic";
import UserListItem from "./reusables/UserListItem";
import { ChatState } from "../context/chatContext";
import { useRouter } from "next/router";
import Nav from "./Nav";
import SideBar from "./SideBar";

const Bar = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Nav onOpen={onOpen} />
      <SideBar isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Bar;
