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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formField: {
    fontSize: 15,
  }
}));

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [style, setStyle] = useState("errorMessage")
  const [style2, setStyle2] = useState("errorMessage")

  const classes = useStyles();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let url = "http://localhost:4000/register";
    let body = {"email": email, "password": password};
    console.log(body);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response.status === 406){
          console.log("Faltan campos")
          setStyle("show")
        }else{
          console.log('Success:', response);
          if(response.message === "User Already Exists"){
            console.log("ya existe")
            setStyle2("show")
          }else{
            setStyle("errorMessage")
            console.log(response)
            setDone(true);
          }
        }
    });
  }

  if(done){
    return(<Redirect to={{pathname: '/', state: {email: email}}}/>);
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            PocketPet
          </Typography>
          <p className={style}>
            *Faltan campos por llenar*
            </p>
          <p className={style2}>
            *El usuario ya existe*
          </p>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
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
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Primer Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
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
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
                  autoComplete="current-password"
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ fontSize: 12}}
            >
              Registrar
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/login" style={{fontSize:12}}>
                  {"Ya tiene cuenta? Inicia sesión"}
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}