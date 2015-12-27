(function(module) {
    var _ = require("underscore");
    var events = require("./mockdata/events.json");
    var eventphotos = require("./mockdata/eventphotos.json");
    var committeemembers = require("./data/committeemembers.json");
    var pastpresidents = require("./data/pastpresidents.json");

    module.exports.index = function(req, res) {
        res.render('index');
    };

    module.exports.partials = function(req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    };
    module.exports.photos = function(req, res) {
        res.locals.events = events;
        console.log(events);
        res.render('partials/gallery');
    };
    module.exports.about = function(req, res) {
        res.locals.committeemembers = committeemembers;
        res.locals.pastpresidents = pastpresidents;
        res.render('about-main');
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
