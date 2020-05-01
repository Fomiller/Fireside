import React from "react";
import Container from "@material-ui/core/Container";
import CustomizedSnackbars from '../components/alert';
import { Typography } from "@material-ui/core";
import {useAppContext} from '../utils/GlobalContext';

export default function Home() {
  return(
    <Container>
      <Typography variant='h1'>
        HOME PAGE
      </Typography>
    </Container>
  )
};