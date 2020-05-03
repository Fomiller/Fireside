import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useAppContext} from '../../utils/GlobalContext';
import UserRight from '../UserRight';
import { Redirect } from 'react-router-dom';

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

export default function UserProfile() {
  const classes = useStyles();
  const [state, dispatch] = useAppContext();
  
  useEffect(() => {
    dispatch({type:'CLEAR_MESSAGES', payload:[]})
  },[]);

if (state.user){
  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img className={classes.avatarImg} alt="user profile" max src={process.env.PUBLIC_URL + `${state.user.avatar}`}/>
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
  } else {
    return <Redirect to={process.env.PUBLIC_URL + '/signin'}/>
  }
}