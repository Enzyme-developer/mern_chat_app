const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const badRequest = require("../errors/badRequest");
const unauthorized = require("../errors/unauthorized");

//Create or fetch One to One Chat
const fetchChat = async (
  req: { body: { userId: string }; user: { _id: string } },
  res: {
    sendStatus: (arg0: number) => any;
    send: (arg0: any) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
    };
  }
) => {
  const { userId } = req.body;

  //check if userId is passed
  if (!userId) {
    console.log("UserId is required");
    return res.sendStatus(400);
  }

  //find chat that contains both ids as users
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }) //populate the users and latestMessage of the chat schema so they can have full detail
    .populate("users", "-password")
    .populate("latestMessage");

  //The chat now has a latestMessage field that has been populated but the sender is still an Id; The path is populated with the User model
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  //if that chat is available proceed, else create a new one
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new badRequest("unable to  fetch chat");
    }
  }
};

// Fetch all chats for a user
const fetchAllChats = async (
  req: { user: { _id: string } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: any): void; new (): any };
    };
  }
) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results: any) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error: any) {
    res.status(400);
    throw new badRequest(error.message);
  }
};

//Create New Group Chat
const createGroupChat = async (
  req: { body: { users: string; name: string }; user: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: string): any; new (): any };
      json: { (arg0: any): void; new (): any };
    };
  }
) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send("Please Fill all the feilds");
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error: any) {
    res.status(400);
    throw new badRequest(error.message);
  }
};

//Rename Group
const renameGroup = async (
  req: { body: { chatId: string; chatName: string } },
  res: { status: (arg0: number) => void; json: (arg0: any) => void }
) => {
  const { chatId, chatName } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.json(updatedChat);
  } catch (error: any) {
    console.log(error);
    res.status(400);
    throw new badRequest("chat not updated");
  }
};

//Remove user from Group
const removeFromGroup = async (
  req: { body: { chatId: string; userId: string } },
  res: { status: (arg0: number) => void; json: (arg0: any) => void }
) => {
  const { chatId, userId } = req.body;
  // check if the requester is admin
  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.json(removed);
  } catch (error: any) {
    console.log(error);
    throw new badRequest("user could not be removed");
  }
};

//Add user to Group / Leave
const addToGroup = async (
  req: { body: { chatId: string; userId: string } },
  res: { status: (arg0: number) => void; json: (arg0: any) => void }
) => {
  const { chatId, userId } = req.body;
  // check if the requester is admin
  try {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.json(added);
  } catch (error: any) {
    console.log(error);
    throw new badRequest("user could not be added");
  }
};

module.exports = {
  fetchChat,
  fetchAllChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};