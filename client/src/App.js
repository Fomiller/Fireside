import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import StickyFooter from './components/footer';
import NavbarDrawer from './components/navigation';
import Chat from './components/Chat-Components/Chat/Chat';
import { SignIn, SignUp, User, NoMatch } from './pages';
import { AppProvider } from './utils/GlobalContext';
import {SynthWaveTheme} from './utils/theme';


function App() {
  
  return (
    <AppProvider>
      <ThemeProvider theme={SynthWaveTheme}>
        <Router>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/signin'}>
                <SignIn/>
                <StickyFooter/>
            </Route>
            <Route exact path={[process.env.PUBLIC_URL + '/signup', process.env.PUBLIC_URL + '/',process.env.PUBLIC_URL + '/home']}>
              <SignUp/>
              <StickyFooter/>
            </Route>
            <Route exact path={process.env.PUBLIC_URL + '/user/:id'}>
              <NavbarDrawer/>
              <User/>
              <StickyFooter/>
            </Route>
            <Route exact path={process.env.PUBLIC_URL + '/chat'} component={Chat}/>
            <Route exact path={process.env.PUBLIC_URL + '*'}>
              <NoMatch/>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
