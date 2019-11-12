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
    pets: Array[{
        name: String,
        color: String,
        breed: String,
        size: String,
        weight: Number,
        species: String,
        photo: String,
        vaccines: Array[{
            type: String,
            application_date: Date
        }]
    }]
});

let User = mongoose.model('User', userSchema);

let UserFunctions = {
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
		return Student.find(newUser).then(function(userData) {
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
		return UserFunctions.find(updateUser.email)
			.then( user => {
				if ( user ){
					return Student.findOneAndUpdate( {email : user.email}, {$set : updateUser}, {new : true})
						.then( newStudent => {
							return newStudent;
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

module.exports = { UserFunctions };