import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class NewPet extends Component {
	//Create Pet Forum
	constructor(props) {
		super(props);
		this.pet = {
			name: this.props.location.state.name,
			color: '',
			breed: '',
			size: '',
			weight: '',
			species: '',
			photo: '',
			vaccines: []
		};

		this.vaccine = {
			type: '',
			application_date: new Date()
		};
	};
    
    render() {
        return (
        	<div className="container">
	        	<h1>Form</h1>
			    <form onSubmit="{ this.savePet }">
			      <div className="row">
			        <div className="col-lg">
			          <input type='text' value={this.pet.name} name='petName' placeHolder="Here goes the name"></input>
			        </div>
			        <div className="col-lg">
			          <input type='text' value={this.pet.color} name='color' placeHolder="e.g. Brown, Golden, Red"></input>
			        </div>
			        <div className="col-lg">
			          <input type='text' value={this.pet.name} name='petName' placeHolder="Here goes the name"></input>
			        </div>
			      </div>
			      <div className="row">
			        <div className="col-lg">
			          <input type='text' value={this.pet.size} name='size' placeHolder="Small, Medium, Big"></input>
			        </div>
			        <div className="col-lg">
			          <input type='number' value={this.pet.weight} name='weight' placeHolder="In Kgs"></input>
			        </div>
			        <div className="col-lg">
			          <input type='text' value={this.pet.name} name='petName' placeHolder="Here goes the name"></input>
			        </div>
			      </div>
			    </form>
		    </div>
	    )
    }
}

export default NewPet;