import { Request, Response } from "express";
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const badRequest = require("../errors/badRequest");
const unauthorized = require("../errors/unauthorized");

// Create or fetch One to One Chat
export const fetchChat = async (req: any, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send("UserId is required");
    }

    const isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    const isChatWithSender = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChatWithSender.length > 0) {
      res.send(isChatWithSender[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    }
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch chat" });
    throw new badRequest("Unable to fetch chat");
  }
};

// Fetch all chats for a user
export const fetchAllChats = async (req: any, res: Response) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const chatsWithSender = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    res.status(200).send(chatsWithSender);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create New Group Chat
export const createGroupChat = async (req: any, res: Response) => {
  try {
    const { users, name } = req.body;

    if (!users || !name) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const parsedUsers = JSON.parse(users);

    if (parsedUsers.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    parsedUsers.push(req.user);

    const groupChat = await Chat.create({
      chatName: name,
      users: parsedUsers,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
      "users groupAdmin",
      "-password"
    );

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};

// Rename Group
export const renameGroup = async (req: Request, res: Response) => {
  try {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName: chatName },
      { new: true }
    ).populate("users groupAdmin", "-password");

    res.json(updatedChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove user from Group
export const removeFromGroup = async (req: Request, res: Response) => {
  try {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    ).populate("users groupAdmin", "-password");

    res.json(removed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add user to Group / Leave
export const addToGroup = async (req: Request, res: Response) => {
  try {
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    ).populate("users groupAdmin", "-password");

    res.json(added);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
