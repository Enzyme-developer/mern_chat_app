import React, { useState } from "react";
import {
  Stack,
  VStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const setGuestCredentials = () => {
    setEmail("johndoe@gmail.com");
    setPassword("123456");
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Input your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <InputRightElement width="4.5rem">
              <Button h="100%" bg="gray.200" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <Box>
        <Button
          bg="blue.500"
          w="100%"
          my="4"
          color="white"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <Button
          bg="red.500"
          w="100%"
          mb="4"
          color="white"
          onClick={setGuestCredentials}
        >
          Get guest credentials
        </Button>
      </Box>
    </VStack>
  );
};

export default Login;