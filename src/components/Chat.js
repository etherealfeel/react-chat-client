import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import styles from "../styles/Chat.module.css";
import Messages from "./Messages";
import MoodIcon from '@mui/icons-material/Mood';

const socket = io.connect("http://localhost:4000");

const Chat = () => {
  const { search } = useLocation();
  const [state, setState] = useState([]);
  const [params, setParams] = useState({username: "", room: ""});
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;
    socket.emit("sendMessage", { message, params });
    setMessage("");
  };

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>0 users currently</div>
        <button className={styles.left} onClick={leftRoom}>
          Disconnect
        </button>
      </div>

      <div className={styles.messages}>
        <Messages messages={state} username={params.username}/>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="Type something here..."
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.emoji}>
          <MoodIcon onClick={() => setOpen(!isOpen)}/>
          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input type="submit" placeholder="Send a message..." value="" onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Chat;
