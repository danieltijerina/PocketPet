import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/newPet.css';

class NewPet extends Component {
	//Create Pet Forum
	constructor(props) {
		super(props);

		this.state = {
			//Default values
			updateble: true,
			breeds: ['No hay especie seleccionada'],
			state: 'Registrar tu mascota',
			edit: false,
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
			dogBreeds.unshift("Selecciona la raza.")
			this.populateBreeds(this.state.species);
		}).catch(err => {
			//Alert user that there was an error retriving the list of breeds
			console.log(err);
		});

		fetch('https://api.thecatapi.com/v1/breeds').then(response => {
			return response.json();
		}).then(data => {
			catBreeds = data.map(cat => cat.name);
			catBreeds.unshift("Selecciona la raza.")
			this.populateBreeds(this.state.species);
		}).catch(err => {
			//Alert user that there was an error retriving the list of breeds
			console.log(err);
		});
		this.populateBreeds = (val) => {
			this.setState({species: val}, function() {			
				this.setState({breed: ''});
				if(this.state.species === 'Perro') {
					this.setState({breeds: dogBreeds});
				} else if (this.state.species === 'Gato') {
					this.setState({breeds: catBreeds});
				} else {
					this.setState({breeds: ['No hay especie seleccionada']});
				}
			});
;		};
		let setState = () => {
			if (this.state.name !== '') {
				this.setState({state: 'Actualizar info de ' + this.state.name})
				this.setState({edit: true});
				//Perform Call to get pet info!
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

		this.addVaccine = (e) => {
			e.preventDefault();
			let vaccine = {
				type: this.state.type,
				application_date: this.state.application_date
			};
			let vaccineList = this.state.vaccines;
			vaccineList.push(vaccine);
			this.setState({vaccines: vaccineList, type: '', application_date: new Date()});
		};

		this.deleteRow = (index) => {
			let vaccines = this.state.vaccines;
			vaccines.splice(index, 1);
			this.setState({vaccines: vaccines});
		}

		this.populateTable = () => {
			return this.state.vaccines.map((vaccine, index) => 
				<tr key={index}>
					<td>{vaccine.type}</td>
					<td>{vaccine.application_date}</td>
					<td><input type='button' className='btn btn-danger' value="X" onClick={() => this.deleteRow(index)}></input></td>
				</tr>
			);
		};
		this.style = this.state.edit ? {} : {display: 'none'};
	};
    
    render() {
    	const disButton = this.state.photo !== '' ? {} : {display: 'none'};	

        return (
        	<div>
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
				        	<select className="form-control form-control-lg" name='breed' /*value={this.state.breed}*/ onChange={this.updateValue}>
				          		{ this.state.breeds.map((breed) => <option value={breed}>{breed}</option> )}
		          			</select>
				        </div>
				      </div>
				      <div className="form-gruop">
				        <div className="col-md-4">
				          <label htmlFor="size">Tamaño</label>
				          <input className="form-control form-control-lg" type='text' value={this.state.size} name='size' placeholder="Pequeño, Mediano, Grande" onChange={this.updateValue}></input>
				        </div>
				        <div className="col-md-4">
				          <label htmlFor="weight">Peso</label>
				          <input className="form-control form-control-lg" type='number' value={this.state.weight} name='weight' placeholder="En Kgs" onChange={this.updateValue}></input>
				        </div>
				        <div className="col-md-4">
				          <label htmlFor="species">Specie</label>
				          <select className="form-control form-control-lg" name="species" value={this.state.species} onChange={e => this.populateBreeds(e.target.value)}>
				          	<option value=''>Selecciona la especie</option>
				          	<option value='Perro'>Perro</option>
				          	<option value='Gato'>Gato</option>
				          </select>
				        </div>
				      </div>
				      <div className="form-group">
				      	<div className="col-md-4">
				      		<label htmlFor="photo">Imagen</label>
				      		<input className="form-control form-control-lg" type='text' name='photo' value={this.state.photo} placeholder="Url de la imagen" onChange={this.updateValue}></input>
				      	</div>
				      	<div className="col-md-4" style={disButton}>
				      		<br/>
				      		<a className='btn btn-primary btn-lg' href={this.state.photo} target="_blank">Vista Previa</a>
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
			    <div className="container" style={this.style}>
			    	<h2>Vacunas</h2>
			    	<table className='table'>
			    		<thead>
			    			<tr>
			    				<th scope='col'>Descripción</th>
			    				<th scope='col'>Fecha</th>
			    				<th scope='col'>Acciones</th>
			    			</tr>
			    		</thead>
			    		<tbody>
			    			{ this.populateTable() }
			    		</tbody>
			    	</table>
				    <form onSubmit={this.addVaccine}>
				    	<h3>Agregar Vacuna</h3>
				    	<div className="form-group">
					      	<div className="col-md-4">
					      		<label htmlFor="type">Descripción</label>
					      		<input className="form-control form-control-lg" type='text' name='type' value={this.state.type} placeholder="Identifica la vacuna" onChange={this.updateValue}></input>
					      	</div>
					      	<div className="col-md-4">
					      		<label htmlFor="application_date">Fecha de Applicación</label>
					      		<input className="form-control form-control-lg" type='date' name='application_date' value={this.state.application_date} onChange={this.updateValue}></input>
					      	</div>
				     	</div>
				     	<div className="form-group">
					      	<div className="col-sm-3">
					      		<input className='btn btn-success btn-lg' type='submit' value='Agregar'></input>
					      	</div>
				      	</div>
				    </form>
			    </div>
			</div>
	    )
    }
}

export default NewPet;