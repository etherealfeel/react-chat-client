import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, Container, TextField, Typography, Grid } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const PROPERTIES = {
  USERNAME: "username",
  ROOM: "room",
};

const Home = () => {
  const { USERNAME, ROOM } = PROPERTIES;
  const [values, setValues] = useState({ [USERNAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((value) => !value);
    if (isDisabled) e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          padding: "32px 64px ",
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid violet",
          borderRadius: 2,
          backgroundColor: "white",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ChatIcon />
        </Avatar>

        <Typography component="h1" variant="h5" fontFamily="'Space Grotesk', sans-serif">
          Join now
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="Username"
                name="username"
                value={values[USERNAME]}
                onChange={handleChange}
                autoComplete="off"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                label="Room"
                name="room"
                value={values[ROOM]}
                onChange={handleChange}
                autoComplete="off"
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Link
            onClick={handleClick}
            to={`/chat?username=${values[USERNAME]}&room=${values[ROOM]}`}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}>
              Connect
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
