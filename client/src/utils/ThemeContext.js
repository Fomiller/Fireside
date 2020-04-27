import React, { createContext } from 'react';
import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type:'dark',
  }
});

export const ThemeContext = createContext(theme);

