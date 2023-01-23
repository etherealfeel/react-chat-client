import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Messages = ({ messages, username }) => {
  const useStyles = makeStyles({
    root: (props) => ({
      alignSelf: props.me ? "flex-end" : "flex-start",
      textAlign: props.me ? "right" : "left",
      color: props.me ? "#fff" : "rgb(35, 35, 35)",
      backgroundColor: props.me ? "rgb(110, 110, 110)" : "#eaeaea",
      borderRadius: "6px",
    }),
  });

  const MyMessageBox = (props) => {
    const someProps = { me: props.person };
    const classes = useStyles(someProps);
    return <Box className={classes.root}>{props.childen}</Box>;
  };

  return (
    <Box sx={{
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      rowGap: "20px"
    }}>
      {messages.map(({ user, message }, i) => {
        const itsMe = user.username.trim().toLowerCase() === username.trim().toLowerCase();

        return (
          <MyMessageBox
            key={i}
            person={itsMe}
            childen={
              <Box padding="5px 10px">
                <Typography component="h1" variant="h6" fontStyle="italic">
                  {itsMe ? `${user.username} (Me)` : user.username}
                </Typography>
                <Typography component="p">{message}</Typography>
              </Box>
            }
          />
        );
      })}
    </Box>
  );
};

export default Messages;
