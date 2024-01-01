const Message = require("../models/messageModel");

const addMessage = async (req, res) => {
  try {
    const userId = req.params.id;
    const { content, chat } = req.body;
    const message = new Message({ sender: userId, content, chat });
    const isMessage = await message.save();
    if (!isMessage)
      return res.json({ succcess: 0, message: "messages not fond" });
    return res.json({
      succcess: 1,
      data: isMessage,
      message: "messages saved",
    });
  } catch (error) {
    res.json({ succcess: 0, error: error.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const chatId = req.params.id;
    const messages = await Message.find({ chat: chatId });
    if (!messages)
      return res.json({ succcess: 0, message: "no messages fond" });
    return res.json({ succcess: 1, data: messages });
  } catch (error) {
    return res.json({ succcess: 0, error: error.message });
  }
};

module.exports = { addMessage, getMessage };
