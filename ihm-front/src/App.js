import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import { AppBar, Button, Container, Paper, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { blue, green, red } from '@mui/material/colors';

import ControlMotor from "./components/ControlMotor";

function App() {
  const [messageSocket, setMessageSocket] = useState("");
  const [socket, setSocket] = useState(null);
  const [connection, setConnection] = useState(false);

  const port = '8080';
  const host = '192.168.225.174';

  const ColorButton = styled(Button)(({ theme, stateSocket }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: stateSocket === true ? green[500] : red[500],
    '&:hover': {
      backgroundColor: stateSocket === true ? green[700] : red[600],
    },
  }));

  useEffect(() => {
    if (socket) {
      socket.on('getSpeed',onReceiveSpeedMotor);
    }
  }, [socket]);

  function onConnect() {
    setConnection(true);
  }

  function onDisconnect() {
    setConnection(false);
  }

  function onReceiveSpeedMotor(data) {
    setMessageSocket(data);
  }

  const toggleConnection = () => {
    if (socket && connection) {
      socket.disconnect();
      setSocket(null);
      onDisconnect();
    } else {
      const newSocket = io(`http://${host}:${port}`);
      newSocket.on('connect', onConnect);
      setSocket(newSocket);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
          <Typography variant="h4">IHM - Projet Robot</Typography>
          <ColorButton onClick={toggleConnection} stateSocket={connection}>
            {connection ? 'Connecté' : 'Déconnecté'}
          </ColorButton>
        </Toolbar>
      </AppBar>
      <Container>
        <ControlMotor socket={socket} />
      </Container>
    </>
  );
}

export default App;
