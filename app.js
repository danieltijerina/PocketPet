const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())



app.listen(port, function() {
  console.log('Server up and running on port', port)
})