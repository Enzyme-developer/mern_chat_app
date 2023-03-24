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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const toast = useToast();
  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      router.push("/chat");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: error?.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
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
            variant='outline'
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
              variant='outline'
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
          colorScheme="purple"
          w="100%"
          my="4"
          color="white"
          isLoading={loading}
          isDisabled={loading}
          isActive={!loading}
          loadingText="Logging you in!"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <Button
          bg="#7e07e0"
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
