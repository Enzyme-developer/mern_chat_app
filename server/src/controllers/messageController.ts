import { Request, Response } from "express";
import Message from "../models/messageModel";
import Chat from "../models/chatModel";
import BadRequest from "../errors/badRequest";

export const sendMessage = async (
  req: any,
  res: Response
) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400).json({ message: "Invalid data passed into request" });
    throw new BadRequest("Invalid data passed into request");
  }

  const newMessageData = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let newMessage = await Message.create(newMessageData);
    newMessage = await newMessage.populate({
      path: "chat.users",
      select: "name picture",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: newMessage,
    });

    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const fetchAllMessages = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name picture email")
      .populate({
        path: "chat",
        populate: {
          path: "users",
          model: "User",
          select: "name picture email",
        },
      });

    res.status(200).json({ mesage: "message fetched successfully", messages });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
