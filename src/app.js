import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pets';
import newPet from './newPet';
import SignIn from './signIn';
import SignUp from './signUp';

class App extends Component {
    render(props) {
      return (
      <div>
          <Switch>
            <Route path="/home" component={newPet} />
            <Route path="/login" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/" component={Album} />
          </Switch>
      </div>
      );
    }
  }
  
  export default App;