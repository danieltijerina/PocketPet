import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pets';
import newPet from './newPet';

class App extends Component {
    render(props) {
      return (
      <div>
          <Switch>
            <Route path="/home" component={newPet} />
            <Route path="/" component={Album} />
          </Switch>
      </div>
      );
    }
  }
  
  export default App;