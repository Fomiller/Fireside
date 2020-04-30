import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../utils/GlobalContext';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
  roomInput: {
    marginBottom: '50px',
  }
}));

export default function Join() {
  const [state, dispatch] = useAppContext()
  const [room, setRoom] = useState('');
  const classes = useStyles();

  return (
          <Grid item xs={12}>
            <TextField
            id="outlined-basic"
            label="Enter Room"
            variant="outlined"
            onChange={(event) => setRoom(event.target.value)}
            fullWidth
            className={classes.roomInput}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline
              }
            }}
            />
            <Button
            fullWidth
            component={Link}
            variant="outlined"
            color='secondary'
            onClick={event => (!room) ? event.preventDefault() : null}
            to={`/chat?name=${state.user.username}&room=${room}`}>
              Join Chat Room
            </Button>
          </Grid>
  );
}
