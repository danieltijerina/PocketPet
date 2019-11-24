import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/newPet.css';

class NewPet extends Component {
	//Create Pet Forum
	constructor(props) {
		super(props);

		this.state = {
			updateble: true,
			breeds: ['Seleccione el tipo de mascota primero'],
			//Pet attributes
			name: this.props.location.state.name,
			color: '',
			breed: '',
			size: '',
			weight: '',
			species: '',
			photo: '',
			vaccines: [],
			//Vaccines
			type: '',
			application_date: new Date()
		};

		let dogBreeds = [];
		let catBreeds = [];

		fetch('https://dog.ceo/api/breeds/list').then( response => {
			return response.json();
		}).then(data => {
			dogBreeds = data.message;
			this.populateBreeds(this.state.species);
		}).catch(err => {
			//Alert user that there was an error retriving the list of breeds
			console.log(err);
		});

		fetch('https://api.thecatapi.com/v1/breeds').then(response => {
			return response.json();
		}).then(data => {
			catBreeds = data.map(cat => cat.name);
			this.populateBreeds(this.state.species);
		}).catch(err => {
			//Alert user that there was an error retriving the list of breeds
			console.log(err);
		});
		this.populateBreeds = (val) => {
			this.setState({species: val});
			
			if(this.state.species === 'Perro') {
				this.state.breeds = dogBreeds;
			} else if (this.state.species === 'Gato') {
				this.state.breeds = catBreeds;
			} else {
				this.state.breeds = ['No hay especie seleccionada'];
			}
		};
		let setState = () => {
			if (this.state.name !== '') {
				this.state.state = 'Actualizar info de ' + this.state.name; 
			} else {
				this.state.state = 'Registrar tu mascota';
			}
		};

		setState();

		this.updateValue = (e) => {
			let key = e.target.name;
			let val = e.target.value;
			this.setState({[key]: val});
		}

		this.savePet = (e) => {
			e.preventDefault();
			let pet = {
				name: this.state.name,
				color: this.state.color,
				breed: this.state.breed,
				size: this.state.size,
				weight: this.state.weight,
				species: this.state.species,
				photo: this.state.photo,
				vaccines: this.state.vaccines,
			}
			console.log(pet);
		};
	};
    
    render() {
        return (
        	<div className="container">
	        	<h1>{this.state.state}</h1>
			    <form onSubmit={this.savePet}>
			      <div className="form-group">
			        <div className="col-md-4">
			       	  <label htmlFor="name">Nombre de tu mascota</label>
			          <input className="form-control form-control-lg" type='text' value={this.state.name} name='name' placeholder="Aqui escribe el nombre" onChange={this.updateValue}></input>
			        </div>
			        <div className="col-md-4">
			          <label htmlFor="color">Color</label>
			          <input className="form-control form-control-lg" type='text' value={this.state.color} name='color' placeholder="ej. Cafe, Dorado, Rojo" onChange={this.updateValue}></input>
			        </div>
			        <div className="col-md-4">
			        	<label htmlFor="breed">Raza</label>
			        	<select className="form-control form-control-lg" name='breed'>
			          		{ this.state.breeds.map((breed) => <option value={breed}>{breed}</option> )}
	          			</select>
			        </div>
			      </div>
			      <div className="form-gruop">
			        <div className="col-md-4">
			          <label htmlFor="size">Tamaño</label>
			          <input className="form-control form-control-lg" type='text' /*value={this.state.size}*/ name='size' placeholder="Pequeño, Mediano, Grande"></input>
			        </div>
			        <div className="col-md-4">
			          <label htmlFor="weight">Peso</label>
			          <input className="form-control form-control-lg" type='number' /*value={this.state.weight}*/ name='weight' placeholder="En Kgs"></input>
			        </div>
			        <div className="col-md-4">
			          <label htmlFor="species">Specie</label>
			          <select className="form-control form-control-lg" name="species" value={this.state.species} onChange={e => this.populateBreeds(e.target.value)}>
			          	<option calue="">Selecciona la especie</option>
			          	<option value="Perro">Perro</option>
			          	<option value="Gato">Gato</option>
			          </select>
			        </div>
			      </div>
			      <div className="form-group">
			      	<div className="col-md-4">
			      		<label htmlFor="image">Imagen</label>
			      		<input className="form-control form-control-lg" type='text' name='image' placeholder="Url de la imagen"></input>
			      	</div>
			      </div>
			      <div className="form-group">
			      	<div className="col-sm-3">
			      		<input className='btn btn-success btn-lg' type='submit' value='Guardar'></input>
			      		<span> </span>
			      		<input className='btn btn-danger btn-lg' type='button' value='Cancelar'></input>
			      	</div>
			      </div>
			    </form>
		    </div>
	    )
    }
}

export default NewPet;