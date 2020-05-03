import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Button, TextField } from '@material-ui/core';
import {useAppContext} from '../../utils/GlobalContext';
import { Link } from 'react-router-dom';
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
  },
  logoutBtn: {
    color:theme.palette.error.dark,
    borderColor: theme.palette.error.dark,
  }
}));

export default function UserRight() {
  const [state, dispatch] = useAppContext();
  const roomRef = useRef(null);
  const classes = useStyles();

  const CustomLink = (props) => <Link  to={`/chat?name=${state.user.username}&room=${state.room}`} {...props} />


  return(
    <Grid container direction="column" justify="space-around" alignItems="stretch" spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h2' component='h2'>
          {state.user.username}
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <Typography variant='h5' component='h2'>
          { `${state.user.firstName} ${state.user.lastName}` }
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <Typography variant='h5' component='h2'>
          {state.user.email}
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <TextField
        inputRef={roomRef}
        id="outlined-basic"
        label="Enter Room"
        variant="outlined"
        onChange={() => dispatch({type:'SET_ROOM', payload:roomRef.current.value})}
        fullWidth
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline
          }
        }}
        />
      </Grid>
      <Grid item xs={12}>
      <Button
        fullWidth
        variant="outlined"
        component={CustomLink}
        color='secondary'
        onClick={event => (!state.room) ? event.preventDefault() : null}
        >
        Join Chat Room
        </Button>
      </Grid>
    </Grid>
  )
}