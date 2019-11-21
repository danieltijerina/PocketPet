const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

let {UserList} = require("./model");

router.post('/register', (req, res, next) => {
	let {email, password} = req.body;
	if(!email || !password) {
		return res.status(406).json({
			status: 406,
			message: "Missing Params"
		});
	}
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

module.exports = router;