import { Router, useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const initialState = {}

export const ChatContext = createContext(initialState);

const ChatProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
    setUser(userInfo)

    if (!userInfo) {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  )
};

export const ChatState: any = () => {
  return useContext(ChatContext);
};

export default ChatProvider;