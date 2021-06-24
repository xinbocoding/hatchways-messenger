import React, { useRef, useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  messageBox: {
    maxHeight: "70vh",
    overflow: "auto",
  },
}));

const Messages = (props) => {
  const classes = useStyle();

  const { messages, otherUser, userId } = props;

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const { messages, otherUser, userId } = props;

  let lastMsgReadIdx = messages
    .slice()
    .reverse()
    .filter((message) => message.senderId === userId);
  
  const lastMsgReadId = lastMsgReadIdx[0].id;

  return (
    <div className={classes.messageBox}>
      <Grid container direction="column">
        {messages.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <SenderBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
              lastMsgReadId={lastMsgReadId}
              msgId={message.id}
            />
          ) : (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default Messages;
