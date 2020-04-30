import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../utils/GlobalContext';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export default function Join() {
  const [state, dispatch] = useAppContext()
  const [room, setRoom] = useState('');

  return (
        <Box>
          <TextField
          id="outlined-basic"
          label="Enter Room"
          variant="outlined"
          onChange={(event) => setRoom(event.target.value)}
          />
          <Button
          component={Link}
          variant="outlined"
          color='secondary'
          onClick={event => (!room) ? event.preventDefault() : null}
          to={`/chat?name=${state.user.username}&room=${room}`}>
            Join Chat Room
          </Button>
        </Box>
  );
}
