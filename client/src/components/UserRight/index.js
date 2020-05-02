import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import {useAppContext} from '../../utils/GlobalContext';
import Join from '../join';
import { logout } from '../../utils/API';

export default function UserRight() {
  const [state, dispatch] = useAppContext();


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
      <Grid item xs={12}>
        <Button onClick={() => dispatch({type:"LOGOUT"})}></Button>
      </Grid>
    </Grid>
  )
}