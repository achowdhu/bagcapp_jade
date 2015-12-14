 var express = require('express');
 var morgan = require('morgan');
 var bodyParser = require('body-parser');
 var cookieParser = require('cookie-parser');
 var methodOverride = require('method-override');
 var path = require('path');

 var routes = require("./routes/index");
 var app = express(); // create our app w/ express

 // all environments
 app.set('port', process.env.PORT || 3000);
 app.set('views', __dirname + '/views');
 app.set('view engine', 'jade');
 app.use(morgan('dev'));

 app.use(bodyParser.urlencoded({
     extended: true
 }));
 app.use(bodyParser.json());
 app.use(methodOverride());

 // set the static files location /public/img will be /img for users
 app.use(express.static(path.join(__dirname, '/public')));

 app.get("/photos/:eventId", routes.eventphotos);
 app.get("/photos", routes.photos);
 app.get("/", routes.index);

 // listen (start app with node server.js) ======================================
 var port = process.env.PORT || 3000;
 app.listen(port);
 console.log("App listening on port :" + port);
