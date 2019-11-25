const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, function() {
    console.log('You have entered a cursed land ' + port);
  }).on('error', function(error) {
    mongoose.disconnect();
  });