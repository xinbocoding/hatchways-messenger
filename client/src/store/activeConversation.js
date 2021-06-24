const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (recipientId) => {
  return {
    type: SET_ACTIVE_CHAT,
    recipientId
  };
};

const reducer = (state = 0, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return action.recipientId;
    }
    default:
      return state;
  }
};

export default reducer;
