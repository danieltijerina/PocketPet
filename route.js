const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

let {UserList} = require("./model");

router.delete('/delPet/:email/:id', (req, res) => {
	const id = req.params.id;
	const email = req.params.email;
	UserList.delPet(email, id).then(response => {
		console.log(response);
		return res.status(200).json(response);
	}).catch(err => {
		console.log(err);
		return res.status(500).json(err);
	});	
});

router.post('/register', (req, res, next) => {
	if(!req.body.email || !req.body.password) {
		return res.status(406).json({
			status: 406,
			message: "Missing Params"
		});
    }
    let email = req.body.email
    let password = req.body.password
	bcrypt.hash(password, 10).then(hashPasss => {
		UserList.getByEmail(email).then( response => {
			if(response.length == 0) {
				console.log(hashPasss);
				UserList.postUser({email, password: hashPasss}).then(user => {
					console.log(user);
					return res.status(200).json(user);
				}).catch(err => {
					console.log(err);
					return res.status(500).json(err);
				});
			} else {
				res.statusMessage = "User Already Exists";
				return res.status(409).json({message: "User Already Exists"});
			}
		}).catch( err => {
			return res.status(500).json({message: "Internal Server Error"});
		})
	}).catch(err => {
		return res.status(500).json({message: "Internal Server Error"});
	})
});

router.post('/login', (req, res, next) => {
	let {email, password} = req.body;
	UserList.getByEmail(email).then( user => {
		if(user.length == 0) {
			res.statusMessage = "User or password is incorrect";
			return res.status(401).json({
				message : "User or password is incorrect",
				status : 401
			});
		}
		bcrypt.compare(password, user[0].password).then( response => {
			if(response) {
				return res.status(200).json({
					message: "Success",
					status: 201
				});
			}
			res.statusMessage = "User or password is incorrect";
			return res.status(401).json({
				message : "User or password is incorrect",
				status : 401
			}); 
		}).catch(err => {
			res.statusMessage = "Internal Server Error"
			return res.status(500).json({
				message : "Internal Server Error",
				status : 500
			});	
		});
	}).catch( error => {
		console.log(error);
		res.statusMessage = "Internal Server Error"
		return res.status(500).json({
			message : "Internal Server Error",
			status : 500
		});
	});
});

router.get('/users', (req, res, next) => {
	UserList.getAll().then(response => {
		console.log(response);
		return res.status(200).json(response);
	}).catch(err => {
		console.log(err);
		return res.status(500).json(err);
	})
});

router.get('/user/:email', (req, res, next) => {
	const email = req.params.email;
	UserList.getByEmail(email).then(response => {
		console.log(response);
		return res.status(200).json(response);
	}).catch(err => {
		console.log(err);
		return res.status(500).json(err);
	})
});

router.put('/addPet/:email', (req, res, next) => {
	const updatePets = req.body;
	const email = req.params.email;
	UserList.addPet(email, updatePets).then(response => {
		console.log(response);
		return res.status(200).json(response);
	}).catch(err => {
		console.log(err);
		return res.status(500).json(err);
	});
});

router.post('/updatePet/:email/:id', (req, res) => {
	const newPet = req.body;
	const email = req.params.email;
	const id = req.params.id
	UserList.updatePet(email, id, newPet).then(response => {
		console.log(response);
		return res.status(200).json(response);
	}).catch(err => {
		console.log(err);
		return res.status(500).json(err);
	});	
})

router.put('/addVaccine/:email/:id', (req, res) => {
	const vacuna = req.body;
	const email = req.params.email;
	const id = req.params.id;
	UserList.addVaccine(email, id, vacuna).then(response => {
		console.log(response);
		return res.status(200).json(response);
	}).catch(err => {
		console.log(err);
		return res.status(500).json(err);
	});
})

router.get('/pets/:email', (req, res) => {
	const email = req.params.email;
	UserList.getByEmail(email).then(response => {
		console.log(response[0].pets);
		return res.status(200).json(response[0].pets);
	}).catch(err => {
		console.log(err);
		return res.status(500).json(err);
	})
});

router.get('/', (req, res, next)  => {
	let email = req.query.email;
	UserList.getByEmail(email).then( response => {
		console.log(response);
		return res.status(200).json(response);
	}).catch( err => {
		console.log(err);
		return res.status(500).json(err);
	})

});

module.exports = router;