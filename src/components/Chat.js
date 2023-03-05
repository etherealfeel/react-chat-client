import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import Messages from './Messages';
import MoodIcon from '@mui/icons-material/Mood';
import { Container, Button, Box, Typography, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const socket = io.connect('https://chat-server-ef.onrender.com');

const Chat = () => {
  const { search } = useLocation();
  const [state, setState] = useState([]);
  const [params, setParams] = useState({ username: '', room: '' });
  const [message, setMessage] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('getUsers', ({ data: { userCount } }) => {
      setUsers(userCount);
    });
  }, []);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  const leftRoom = () => {
    socket.emit('leftRoom', { params });
    navigate('/');
  };

  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;
    socket.emit('sendMessage', { message, params });
    setMessage('');
  };

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid violet',
          backgroundColor: 'white',
          borderRadius: 2,
          height: '95vh',
          marginTop: '10px',
        }}>
        <Box
          component="header"
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '15px 0',
            borderRadius: '20px 20px 0 0',
            borderBottom: '2px solid violet',
            backgroundColor: '#fff',
            marginBottom: '10px',
          }}>
          <Typography
            component="h1"
            variant="h5"
            fontFamily="'Space Grotesk', sans-serif"
            sx={{
              color: '#000',
              borderRadius: '20px',
              backgroundColor: '#eaeaea',
              padding: '5px 15px',
            }}>
            Room #{params.room}
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            fontFamily="'Space Grotesk', sans-serif"
            sx={{
              color: '#000',
              borderRadius: '20px',
              backgroundColor: '#eaeaea',
              padding: '5px 15px',
            }}>
            Users: {users}
          </Typography>
          <Button variant="outlined" color="error" onClick={leftRoom}>
            Disconnect
          </Button>
        </Box>
        <Box
          sx={{
            overflowY: 'auto',
            flexGrow: 1,
            width: '100%',
            color: '#fff',
            fontSize: '18px',
            background: '#fff',
            padding: '0 32px',
            '&::-webkit-scrollbar': { display: 'none' },
          }}>
          <Messages messages={state} username={params.username} />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 30px',
            margin: '10px 20px 20px 20px',
            border: '2px solid violet',
          }}>
          <Box position="relative">
            <MoodIcon onClick={() => setOpen(!isOpen)} cursor="pointer" />
            {isOpen && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: '120%',
                  border: '1px solid black',
                  borderRadius: '10px',
                }}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </Box>
            )}
          </Box>
          <Input value={message} placeholder="Type something here" color="secondary" onChange={handleChange} onClick={() => setOpen(false)} sx={{ width: '80%' }} />
          <Button onClick={handleSubmit} variant="contained" color="secondary" endIcon={<SendIcon />}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
