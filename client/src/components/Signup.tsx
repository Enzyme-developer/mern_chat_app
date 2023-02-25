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
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const Signup = () => {
  const toast = useToast();
  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [picturePreview, setPicturePreview] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleImage = (e: any) => {
    setPicturePreview(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = async (pic: any) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please Select An Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pic);

    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/jpeg" ||
      pic.type === "image/png"
    ) {
      try {
        const data = new FormData();
        data.append("file", pic);
        data.append("cloud_name", "chatapp");
        data.append("upload_preset", "chatapp");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/cjhatapp/image/upload",
          data
        );
        const imageData = response.data;
        setPicture(imageData.url.toString());
        console.log(imageData.url.toString());
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      toast({
        title: "Type not supported",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    e.target.files != null ? uploadImage(e.target.files[0]) : null;
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    console.log(name, email, password, picture);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          picture,
        },
        config
      );
      console.log(data);

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      router.push("/chats");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Input your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="Input your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>

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

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="100%" bg="gray.200" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Profile picture</FormLabel>
        <Input
          p="1"
          type="file"
          placeholder="choose a picture"
          onChange={handleImage}
        />
      </FormControl>

      <Box>
        {picturePreview && <Image alt="preview" src={picturePreview} width='300' height='300' />}
      </Box>
      <Box>
        <Button
          bg="blue.500"
          w="100%"
          my="4"
          color="white"
          onClick={handleSignup}
        >
          Sign up
        </Button>
      </Box>
    </VStack>
  );
};

export default Signup;
