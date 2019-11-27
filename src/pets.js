import React, { useState, useEffect } from 'react';
import  { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';
import {Link as RouterLink} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    borderRadius: '2%',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 15;

  return {
    top: `${top}%`,
    margin:'auto',
  };
}

function CardModal(props) {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  let populateTable = () => {
    return props.pet.vaccines.map((vaccine, index) => 
      <tr key={index}>
        <td>{vaccine.description}</td>
        <td>{vaccine.application_date}</td>
      </tr>
    );
  }

  return (
    // TODO(Daniel): Keys should be unique (maybe pass key as prop?)
    <Grid item key={1} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={props.pet.photo}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.pet.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={ handleOpen }>
            View
          </Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">{props.pet.name}</h2>
              <div className='modalImg'>
                <img className='srcImg' src={props.pet.photo} />
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="color">Color</label>
                  <p className="modalText" name='color'>{props.pet.color}</p>
                </div>
                <div className="col-md-4">
                  <label htmlFor="species">Specie</label>
                  <p className="modalText" name='species'>{props.pet.species}</p>
                </div>
                <div className="col-md-4">
                  <label htmlFor="breed">Raza</label>
                  <p className="modalText" name='breed'>{props.pet.breed}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="size">Tamaño</label>
                  <p className="modalText" name='size'>{props.pet.size}</p>
                </div>
                <div className="col-md-4">
                  <label htmlFor="weight">Peso</label>
                  <p className="modalText" name='weight'>{props.pet.weight} Kg</p>
                </div>
              </div>
              <div>
                <h2>Vacunas</h2>
                <div className='pre-scrollable'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>Descripción</th>
                        <th scope='col'>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      { populateTable() }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Modal>
          <Button size="small" color="primary" component={RouterLink} to={{ pathname: '/pet', state: {id: props.pet._id, email:props.email} }}>
            Edit
          </Button>
          <IconButton onClick={() => {console.log('button')}} className='glyphicon glyphicon-trash' aria-label="delete"></IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default function Album(props) {
  const [pets, setPets] = useState([]);
  const [email, setEmail] = useState("");
  const [data, setData] = useState(true);
  const [logged, setLogged] = useState(true);
  let serverUrl = 'http://localhost:4000/';
  const classes = useStyles();

  const handleLogout = () => {
    setLogged(false);
  }

  useEffect(() => {
    if(data) {
      setEmail(props.location.state.email);
      let getUserInfo = () => {
        fetch(serverUrl + 'user/' + email).then(response => {
          return response.json();
        }).then(data => {
          setPets(data[0].pets);
          setData(false);
        }).catch(err => {
          console.log(err);
        })
      }
      getUserInfo();
    }
  })

  if(!logged){
    return(<Redirect to="/login"/>);
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Mis mascotas
          </Typography>
          <span className="toolbarButton">
            <Button onClick={handleLogout}>Logout</Button>
          </span>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Pocket Pet
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              <p>¡Bienvenido!</p>
              <p>Consulta, agrega o modifica tus mascotas</p>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button component={RouterLink} to={{ pathname: '/pet', state: {id: '', email:email} }} variant="contained" color="primary">
                      Agregar mascota
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {pets.map(pet => (
              <CardModal {...{pet, email}} />
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Pocket Pet
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}