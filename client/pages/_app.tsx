import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from '../src/context/chatContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChatProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ChatProvider>
  );
}
