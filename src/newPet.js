import React, { Component } from 'react';

class newPet extends Component {

    render() {
        return (<div>
            <h1>hello world</h1>
        <p>hello {this.props.location.state.name}</p>
            {console.log(this.props.location.state.name)}
             </div>)
    }
}

export default newPet;