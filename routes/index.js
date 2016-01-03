(function(module) {
    var _ = require("underscore");
    var events = require("./mockdata/events.json");
    var eventphotos = require("./mockdata/eventphotos.json");
    var committeemembers = require("./data/committeemembers.json");
    var pastpresidents = require("./data/pastpresidents.json");
    var newsletters = require("./data/newsletters.json");
   
    var bannerImgs = [];
    var fs = require('fs');

    var dirbanners = fs.readdirSync('./public/images/bagc/banners');

    
    dirbanners.forEach(function(file) {
        bannerImgs.push("/images/bagc/banners/"+file);
    });
    console.log(bannerImgs);
    module.exports.index = function(req, res) {
        res.locals.link = "home";
        res.locals.banners=bannerImgs;
        res.render('index');
    };


    module.exports.photos = function(req, res) {
        res.locals.events = events;
        res.locals.link = "gallery";
        res.render('partials/gallery');
    };
    module.exports.about = function(req, res) {
        res.locals.committeemembers = committeemembers;
        res.locals.pastpresidents = pastpresidents;
        res.locals.link = "about";
        res.render('about-main');
    };

    module.exports.newsletters = function(req, res) {
        res.locals.newsletters = newsletters;
        res.locals.link = "newsletters";
        res.render('newsletters-main');
    };
    module.exports.eventphotos = function(req, res) {
        var event = _.find(eventphotos, function(eventphoto) {
            return eventphoto.eventId == req.params.eventId;
        });
        if (event) {

            res.status(200).json(event.photos);
        } else {
            res.status(200).json("[]");
        }
        //console.log(event.photos);

    };
}(module));
