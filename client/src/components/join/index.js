import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../utils/GlobalContext';
import Button from '@material-ui/core/Button';
import { Box, Divider } from '@material-ui/core';
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
  },
  joinBtn: {
    borderWidth: '1px',
  }
}));

export default function Join() {
  const [state, dispatch] = useAppContext()
  const [room, setRoom] = useState('');
  const roomRef = useRef(null);
  const classes = useStyles();

  const CustomLink = (props) => <Link  to={`/chat?name=${state.user.username}&room=${state.room}`} {...props} />
  
  return (
          <Grid item xs={12}>
            <TextField
            inputRef={roomRef}
            id="outlined-basic"
            label="Enter Room"
            variant="outlined"
            onChange={() => dispatch({type:'SET_ROOM', payload:roomRef.current.value})}
            fullWidth
            // className={classes.roomInput}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline
              }
            }}
            />
            <Divider/>
            <Button
            fullWidth
            component={CustomLink}
            variant="outlined"
            color='secondary'
            onClick={event => (!state.room) ? event.preventDefault() : null}
           >
            Join Chat Room
            </Button>
          </Grid>
  );
}
