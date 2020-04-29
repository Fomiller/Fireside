import React from 'react';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

export default function NoMatch() {

  return (
    <Container>
      <Typography align='center'>
        <Typography align='center' display='inline' color='secondary' variant='h1'>
          404 
        </Typography>
        <Typography align='center' display='inline' color='primary' variant='h1'>
          PAGE
        </Typography>
        <Typography align='center' display='inline' color='textPrimary' variant='h1'>
          NOT
        </Typography>
        <Typography align='center' display='inline' color='secondary' variant='h1'>
          FOUND
        </Typography>
      </Typography>
      
    </Container>
  )
}