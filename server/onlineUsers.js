const onlineUsers = {};

const checkOnlineUser = (userId) => {
  return !!onlineUsers[userId];
};

const addOnlineUser = (userId, socketId) => {
  if (onlineUsers[userId]) {
    onlineUsers[userId].push(socketId);
  } else {
    onlineUsers[userId] = [socketId];
  }

  return onlineUsers;
};

const offlineUser = (userId, socketId) => {
  let idx = onlineUsers[userId].indexOf(socketId);
  onlineUsers[userId].splice(idx, 1);
  const canOffline = onlineUsers[userId].length === 0;
  
  if(canOffline) delete onlineUsers[userId];

  return canOffline;
}

const getSocketId = userId => {
  return onlineUsers[userId];
}

module.exports = {addOnlineUser, checkOnlineUser, offlineUser, getSocketId};
