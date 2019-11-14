const express = require('express')
const app = express()

const port = process.env.PORT || 4000

app.use(express.json())

app.get('/users', function(req, res) {

})

app.get('/userByEmail/:email', function(req, res) {
  _email = req.params.email

})

app.get('/pet/:ownerEmail/:petIndex', function(req, res) {
  _email = req.params.ownerEmail
  _index = req.params.petIndex

})

app.listen(port, function() {
  console.log('Server up and running on port', port)
})