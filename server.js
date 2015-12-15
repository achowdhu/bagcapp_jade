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

 app.get("*", function(req, res) {
     res.status(404).send("Content Not found.");
 })
 var nodemailer = require('nodemailer')
 var transport = nodemailer.createTransport({ // [1]
     service: "Gmail",
     auth: {
         user: "happyhours2233@gmail.com",
         pass: "Node@123admin"
     }
 });

 // setup e-mail data with unicode symbols 
 var mailOptions = {
     from: 'BAGC Admin<alerts@bagc.net>', // sender address 
     to: 'happyhours2233@gmail.com', // list of receivers 
     subject: 'BAGC | Crash Alert | ', // Subject line 
     text: 'BAGC crashed in production' // plaintext body 
 };
 var errorHandled = false;
 //if (process.env.NODE_ENV === 'production') { // [2]
 process.on('uncaughtException', function(er) {

     console.error(er.stack) // [3]
     if (errorHandled) {
         process.exit(1);
     } else {
         errorHandled = true;
         mailOptions.subject = mailOptions.subject + er.message;
         mailOptions.text = er.stack;
         // send mail with defined transport object 
         transport.sendMail(mailOptions, function(error, info) {
             if (error) {
                 console.log(error);
             }
             console.log('Message sent: ' + info.response);
             process.exit(1);
         });
     }
 });
 //}
 // listen (start app with node server.js) ======================================
 var port = process.env.PORT || 3000;
 app.listen(port);
 console.log("App listening on port :" + port);
