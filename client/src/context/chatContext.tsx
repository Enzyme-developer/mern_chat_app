import { Router, useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

type ChatContextType = {
  user: any
 setUser: React.Dispatch<React.SetStateAction<{}>>
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const ChatProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  console.log(user)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
    setUser(userInfo)
    console.log(user)

    if (!userInfo) {
      router.push("/");
    }
  }, [router.events, router]);

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