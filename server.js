 var express = require('express');
 var morgan = require('morgan');
 var app = express(); // create our app w/ express

 app.use(express.static(__dirname + '/src')); // set the static files location /public/img will be /img for users
 app.use(morgan('dev')); // log every request to the console

 app.get('*', function(req, res) {
     res.sendfile('./src/index.html'); // load the single view file (angular will handle the page changes on the front-end)
 });
 // listen (start app with node server.js) ======================================
 var port = process.env.PORT || 3000;
 app.listen(port);
 console.log("App listening on port :" + port);
