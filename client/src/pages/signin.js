import React, {useState, useEffect, useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { login} from '../utils/API';
import { useAppContext } from '../utils/GlobalContext';
import {Redirect} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" className={classes.customLink} href={process.env.PUBLIC_URL + "/signup"}>
        Fireside
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
  customLink: {
    color: "rgba(140, 30, 255, 1) !important",
    textDecoration:'none',
    "&:hover": {
      textDecoration:'underline',
    }
  },
}));

export default function SignIn() {
  const [state, dispatch] = useAppContext();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const CustomLink = (props) => <Link className={classes.customLink} to={process.env.PUBLIC_URL + "/signup"} {...props} />

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login({username: usernameRef.current.value, password: passwordRef.current.value});
    usernameRef.current.value = '';
    passwordRef.current.value = '';
    if(user === undefined) {
      setOpen(true)
    }
    console.log(user)
    dispatch({type: "SET_USER", payload:user});
  }


  if( state.user ){
    return <Redirect to={process.env.PUBLIC_URL + `/user/${state.user.id}`}/>;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              inputRef={usernameRef}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
            <TextField
              inputRef={passwordRef}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={CustomLink} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <div className={classes.root}>
          {/* <Button variant="outlined" onClick={handleClick}>
            Open success snackbar
          </Button> */}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Please check your user name and password.
            </Alert>
          </Snackbar>
        </div>
      </Container>
    );
  }
}