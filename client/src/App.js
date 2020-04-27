import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Home, SignIn, SignUp, Profile, User, NoMatch } from './pages';
import StickyFooter from './components/footer';
import NavbarDrawer from './components/navigation';
import { AppProvider } from './utils/GlobalContext';
import { Paper, createMuiTheme } from "@material-ui/core";


function App() {
  const [theme, setTheme] = useState({
    palette: {
      type:'light',
    }
  })

  const toggleTheme = () => {
    let newTheme = theme.palette.type === 'light' ? 'dark' : 'light';
    setTheme({
      palette: {
        type: newTheme
      }
    });
  };
  
  const muiTheme = createMuiTheme(theme);
  
  return (
    <AppProvider>
      <ThemeProvider theme={muiTheme}>
        <Paper>
        <Router>
          <Switch>
            <Route exact path='/signin'>
                <SignIn/>
            </Route>
            <Route exact path='/signup'>
              <SignUp/>
            </Route>
            <Route exact path={['/','/home']}>
              <NavbarDrawer toggle={toggleTheme}/>
              <Home/>
            </Route>
            <Route exact path='/profile'>
              <NavbarDrawer toggle={toggleTheme}/>
              <Profile/>
            </Route>
            <Route exact path='/user/:id'>
              <NavbarDrawer toggle={toggleTheme}/>
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
