import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import {Home, Login, SignUp, Profile, User} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={['/','/home']}>
          <Home/>
        </Route>
        <Route exact path='/login'>
          <Login/>
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
    </Router>
  );
}

export default App;
