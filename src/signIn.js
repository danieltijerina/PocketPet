import React, {useState} from 'react';
import  { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink} from 'react-router-dom';
import './css/pet.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ/">
        PocketPet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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
  formField: {
    fontSize: 15,
  }
}));

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [style, setStyle] = useState("errorMessage");

  const classes = useStyles();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let url = "http://localhost:4000/login";
    let body = {"email": email, "password": password};
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        if(response.status === 401){
          setStyle("show")
          console.log("entro")
        }else{
          setStyle("errorMessage")
          setAuth(true);
          localStorage.setItem('auth', true);
        }
    });
  };

  if(auth) {
    return (<Redirect to={{pathname: '/', state: {email: email}}} />);
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Pocket Pet
          </Typography>
          <p className={style} id="error">
            *Contraseña o usuario incorrecto*
            </p>
          <form onSubmit={handleSubmit} className={classes.form} style={{ fontSize: 12}} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              InputProps={{
                classes: {
                  input: classes.formField,
                }
              }}
              InputLabelProps={{
                classes: {
                  root: classes.formField,
                }
              }}
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              InputProps={{
                classes: {
                  input: classes.formField,
                }
              }}
              InputLabelProps={{
                classes: {
                  root: classes.formField,
                }
              }}
              label="Contraseña"
              type="password"
              id="password"
              style={{ fontSize: 12}}
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ fontSize: 12}}
            >
              Iniciar sesión
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/signup" style={{fontSize:12}}>
                  {"No tienes una cuenta? Registrate"}
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}