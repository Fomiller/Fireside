import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Home, SignIn, SignUp, Profile, User, NoMatch } from './pages';
import StickyFooter from './components/footer';
import NavbarDrawer from './components/navigation';
import { AppProvider } from './utils/GlobalContext';
import { Paper, createMuiTheme } from "@material-ui/core";
import {SynthWaveTheme} from './utils/theme';


function App() {
  
  return (
    <AppProvider>
      <ThemeProvider theme={SynthWaveTheme}>
        <Paper square="true">
        <Router>
          <Switch>
            <Route exact path='/signin'>
                <SignIn/>
            </Route>
            <Route exact path='/signup'>
              <SignUp/>
            </Route>
            <Route exact path={['/','/home']}>
              <NavbarDrawer/>
              <Home/>
            </Route>
            <Route exact path='/profile'>
              <NavbarDrawer/>
              <Profile/>
            </Route>
            <Route exact path='/user/:id'>
              <NavbarDrawer/>
              <User/>
            </Route>
            <Route exact path='*'>
            <NoMatch/>
            </Route>
          </Switch>
          <StickyFooter/>
        </Router>
        </Paper>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
