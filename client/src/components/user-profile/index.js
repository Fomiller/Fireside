import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core';
import {useAppContext} from '../../utils/GlobalContext'
import Join from '../join';
import {Redirect} from 'react-router-dom';
import { getLoggedInUser } from '../../utils/API';

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
  avatarImg: {
    maxWidth: '360px',
    width: '100%',
    margin: 'auto',
    display: 'block'
  } 
}));

function UserRight() {
  const [state, dispatch] = useAppContext()
  const classes = useStyles();

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
        <Join/>
      </Grid>
    </Grid>
  )
}


export default function UserProfile() {
  const classes = useStyles();
  const [state, dispatch] = useAppContext()

  useEffect(() => {
    if (!state.user) {
      (async () => {
        const loggedInUser = await getLoggedInUser();
        dispatch({type: "SET_USER", payload:loggedInUser});
      })(); 
    }
  },[]);

  if(state.loggedIn && !state.user) {
    return <Redirect to={process.env.PUBLIC_URL + '/signin'}/>

  } else if (!state.loggedIn) {
    return <h1>Loading</h1>;

  } else {
  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img className={classes.avatarImg} max src={process.env.PUBLIC_URL + `${state.user.avatar}`}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <UserRight/>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
  }
}