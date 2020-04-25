import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import {Home, SignIn, SignUp, Profile, User} from './pages';
import StickyFooter from './components/footer';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={['/','/home']}>
          <Home/>
        </Route>
        <Route exact path='/signin'>
          <SignIn/>
        </Route>
        <Route exact path='/signup'>
          <SignUp/>
        </Route>
        <Route exact path='/profile'>
          <Profile/>
        </Route>
        <Route exact path='/user/:id'>
          <User/>
        </Route>
      </Switch>
      <StickyFooter/>
    </Router>
  );
}

export default App;
