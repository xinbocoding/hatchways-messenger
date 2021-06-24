const { Op, DataTypes } = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {
  user1ReadTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: "2021-06-01 01:01:01.973-04",
  },
  user2ReadTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: "2021-06-01 01:01:01.973-04",
  },
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

//find all conversations by given the userId
Conversation.allConversations = async function (userId) {
  const conversations = await Conversation.findAll({
    where: {
      [Op.or]: {
        user1Id: userId,
        user2Id: userId,
      },
    },
    attributes: ["id"],
  });

  return conversations;
};

module.exports = Conversation;
