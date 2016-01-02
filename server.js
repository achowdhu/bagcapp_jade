 var express = require('express');
 var morgan = require('morgan');
 var bodyParser = require('body-parser');
 var cookieParser = require('cookie-parser');
 var methodOverride = require('method-override');
 var path = require('path');

 var routes = require("./routes/index");
 var app = express(); // create our app w/ express
 var compress = require('compression')();
 app.use(compress);
 // all environments
 app.set('port', process.env.PORT || 3000);
 app.set('views', __dirname + '/views');
 app.set('view engine', 'jade');

 app.use(morgan('dev'));

 app.use(bodyParser.urlencoded({
     extended: true
 }));


 if (app.get('env') === 'development') {
     app.locals.pretty = true;
 }
 app.use(bodyParser.json());
 app.use(methodOverride());

 // set the static files location /public/img will be /img for users
 app.use(express.static(path.join(__dirname, '/public'), {
     maxAge: 100000
 }));

 app.get("/photos/:eventId", routes.eventphotos);
 app.get("/photos", routes.photos);
 app.get("/about", routes.about);
 app.get("/newsletters", routes.newsletters);
 app.get("/", routes.index);


 // Handle 404
 app.use(function(req, res) {
     res.status(400);
     res.render('404.jade', {
         title: '404: File Not Found'
     });
 });

 var nodemailer = require('nodemailer')
 var transport = nodemailer.createTransport({ // [1]
     service: "Gmail",
     auth: {
         user: "******************", //Service Account email address 
         pass: "******************", //Service Account Password
     }
 });

 // setup e-mail data
 var mailOptions = {
     from: 'BAGC Admin<alerts@bagc.net>', // sender address 
     to: '****************', // list of receivers 
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
