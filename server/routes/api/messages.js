const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const {checkOnlineUser} = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    //check if conversation exists and matches the request id
    if (conversation && conversation.id === conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
      //if conversation exists but request id doesn't match conversation's, return 400 not found
    } else if (conversation && conversation.id !== conversationId) {
      return res.sendStatus(400);
    } else if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
        user1ReadTime: Date.now()
      });
      if (checkOnlineUser(sender.id)) {
        sender.online = true;
      }
      //check if conversation exists and matches the request id
    } else if (conversation && conversation.id === conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
      //if conversation exists but request id doesn't match conversation's, return 400 not found
    } else if (conversation && conversation.id !== conversationId) {
      return res.sendStatus(403);
    }
    
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
