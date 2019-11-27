const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: {
        street: String,
        state: String,
        city: String,
        country: String,
        postal_code: Number,
        house_number: String
    },
    pets: [{
        name: String,
        color: String,
        breed: String,
        size: String,
        weight: Number,
        species: String,
        photo: String,
        vaccines: [{
            description: String,
            application_date: String
        }]
    }]
});

let User = mongoose.model('User', userSchema);

let UserList = {
	addPet: function(email, pet) {
		return User.findOneAndUpdate({email: email}, {$push: {pets: pet}}).then(foundUser => {
			return foundUser;
		}).catch(err => {
			throw Error(err);
		});
	},
	delPet: function(email, id) {
		return User.findOneAndUpdate({email: email}, {$pull: {pets: {_id: id}}}, {new: true}).then(foundUser => {
			return foundUser;
		}).catch(err => {
			throw Error(err);
		});
	},
	updatePet: function(email, pet_id, newPet) {
		return User.findOneAndUpdate({email: email, 'pets._id': pet_id}, { $set: {'pets.$': newPet}}, { new: true }).then(user => {
			return user;
		}).catch(err => {
			throw Error(err);
		})
	},
	addVaccine: function(email, id, vacuna){
		return User.findOneAndUpdate({email: email, 'pets._id': id}, { $push: {'pets.$.vaccines': vacuna}},  { new: true }).then(foundUser => {
			return foundUser;
		}).catch(err => {
			throw Error(err);
		})
	},
	getByEmail : function(email) {
		return User.find({email: email}).then(foundUser => {
			return foundUser;
		}).catch(error => {
			throw Error(error);
		});
	},
	postUser : function(newUser) {
		return User.find({email: newUser.email}).then(userList => {
			if (userList.length == 0) {
				return User.create(newUser).then(user => {
					return user;
				}).catch(function(error) {
					throw Error(error);
				});
			}
			return 409;
		}).catch(error => {
			throw Error(error);
		});
	},
	getAll : function() {
		return User.find().then(function(users) {
			return users;
		}).catch(function(error) {
			throw Error(error);
		});
	},
	getOne : function(userEmail) {
		return User.find(userEmail).then(function(user) {
			return user;
		}).catch(function(error) {
			throw Error(error);
		});
	},
	post : function(newUser) {
		return User.find(newUser).then(function(userData) {
			if (userData.length == 0) {
				return User.create(newUser).then(function(user) {
					return user;
				}).catch(function(error) {
					throw Error(error);
				});
			}
			return 409;
		}).catch(function(error) {
			throw Error(error);
		});
	},
	delete : function(userEmail) {
		return User.findOneAndRemove(userEmail).then(function(user) {
			return user
		}).catch(function(error) {
			throw Error(error);
		});
	},
	put : function(updateUser){
		return UserList.getByEmail(updateUser.email)
			.then( user => {
				if ( user ){
					return User.findOneAndUpdate( {email : user.email}, {$set : updateUser}, {new : true})
						.then( newUser => {
							return newUser;
						})
						.catch(error => {
							throw Error(error);
						});
				}
				else{
					throw Error( "404" );
				}
			})
			.catch( error => {
				throw Error(error);
			});
	}
}

module.exports = { UserList };