import React from "react";
import styles from "../styles/Messages.module.css";

const Messages = ({ messages, username }) => {
  return (
    <div className={styles.messages}>
      {messages.map(({ user, message }, i) => {
        const itsMe = user.username.trim().toLowerCase() === username.trim().toLowerCase();
        const className = itsMe ? styles.me : styles.user;

        return (
          <div key={i} className={`${styles.message} ${className}`}>
            <span className={styles.user}>{user.name}</span>

            <div className={styles.text}>{message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
