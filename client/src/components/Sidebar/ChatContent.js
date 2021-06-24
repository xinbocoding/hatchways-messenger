import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: -0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const displayUnreadCount = (unreadCount, classes) => {
  if (unreadCount > 0)
    return (
      <Typography className={classes.notification}>{unreadCount}</Typography>
    );
};

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      <Box>{displayUnreadCount(unreadCount, classes)}</Box>
    </Box>
  );
};

export default ChatContent;
