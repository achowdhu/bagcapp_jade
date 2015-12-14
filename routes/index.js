(function(module) {
    var _ = require("underscore");
    var events = require("./mockdata/events.json");
    var eventphotos = require("./mockdata/eventphotos.json");

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
