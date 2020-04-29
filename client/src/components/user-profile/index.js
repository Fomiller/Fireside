import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import FriendTable from '../friends-list';
import { Typography } from '@material-ui/core';
import {useAppContext} from '../../utils/GlobalContext'
import Join from '../Chat-Components/Join/Join';


import Image from 'material-ui-image';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  name: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

function UserRight() {
  const [state, dispatch] = useAppContext()
  const classes = useStyles();
  console.log("USER: ", state);


  return(
    <Grid container direction="column" justify="space-around" alignItems="stretch" spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h2' component='h2'>
          {/* This should be the user name from state... */}
          {state.user.username}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField 
        fullWidth
        id="standard-basic"
        label="First Name"
        spacing={2}
        value={state.user.firstName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
        fullWidth
        id="standard-basic"
        label="Last Name"
        spacing={2}
        value={state.user.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
        fullWidth
        id="standard-basic"
        label="Test@gmail.com"
        spacing={2}
        value={state.user.email}
        />
      </Grid>
    </Grid>
  )
}


export default function UserProfile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Image src="https://i.picsum.photos/id/958/200/200.jpg"/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <UserRight/>
          {/* The friends list could go here to make a more compact design */}
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Join/>
        </Grid>
      </Grid>
    </div>
  );
}