const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const AccessChat = async (req, res) => {
  try {
    const currentUserId = req.params.id;
    const { userId } = req.body;
    console.log(currentUserId);
    if (!userId)
      return res.json({
        success: 0,
        message: "userid params not send with request",
      });

    const isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: currentUserId } } },
        // (users: { $all: [currentUserId, userId] }), // Use $all to match both users
      ],
    })
      .populate("users", "-password")
      .populate({ path: "latestMeassage" });
    console.log("222222222222222222 isChat", isChat);

    const isChatResult = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username email phone",
    });
    console.log("333333333333333333 isChatResult", isChatResult);
    if (isChatResult.length > 0) {
      return res.json({
        success: 1,
        data: isChatResult[0],
        message: "chat found successfully",
      });
    } else {
      let chatData = {
        chatName: "talk",
        isGroupChat: false,
        users: [currentUserId, userId],
      };
      console.log("chat data creation started");
      //   const createdChat = await Chat.create(chatData);
      const createdChat = new Chat(chatData);
      const reuslt = await createdChat.save();
      if (!reuslt)
        return res.json({ success: 0, message: "chat creation failed" });
      console.log("created chat: ", createdChat);
      const newChat = await Chat.findById(createdChat._id).populate(
        "users",
        "-password"
      );
      return res.json({
        success: 1,
        data: newChat,
        message: "chat created successfully",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: error.message,
    });
  }
};

const allChat = async (req, res) => {
  try {
    const chats = await Chat.find({});
    if (!chats) return res.json({ success: 0, message: "chatid not found" });
    res.json({
      success: 1,
      data: chats,
      message: "all chat found successfully",
    });
  } catch (error) {
    return res.json({ success: 0, message: error.message });
  }
};
module.exports = { AccessChat, allChat };
