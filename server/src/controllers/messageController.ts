const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const express = require("express");

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
export const sendMessage = async (
  req: { body: { chatId: string; content?: string }; user: { _id: string } },
  res: { sendStatus: (arg0: number) => any; json: (arg0: any) => void }
) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let message = {
    sender: req.user._id,
    message: content,
    chat: chatId,
  };

  try {
    let newMessage = await Message.create(message);
    newMessage = await newMessage.populate("sender", "name picture");
    newMessage = await newMessage.populate("chat");
    newMessage = await User.populate({
      newMessage,
      path: "chat.users",
      select: "name picture",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: newMessage,
    });
    res.json(newMessage);
  } catch (error) {
    console.log(error);
  }
};

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
export const fetchAllMessages = async (
  req: { params: { chatId: string } },
  res: { json: (arg0: any) => void; status: (arg0: number) => void }
) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name picture email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = { fetchAllMessages, sendMessage };
