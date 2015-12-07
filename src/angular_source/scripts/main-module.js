new WOW().init();
(function(angular, _) {
    var mainModule = angular.module("appModule", ["ui.router", "ngAnimate"]);

    mainModule.directive('prettyp', function() {
        return function(scope, element, attrs) {
            $("[rel^='prettyPhoto']").prettyPhoto({
                deeplinking: false,
                social_tools: false
            });
        }
    });

    mainModule.factory("eventService", ["$http", "$q", fnEventService]);
    mainModule.controller("eventController", ["eventService", fnEventController]);
    mainModule.controller("eventPhotoController", ["$stateParams", "eventService", fnEventPhotoController]);

    function fnEventService($http, $q) {
        return {
            getEvents: getEvents,
            getEventPhotos: getEventPhotos
        }

        function getEvents() {
            var deferred = $q.defer();
            $http.get("mockdata/events.json")
                .then(function(response) {
                    deferred.resolve(response.data);
                }).catch(function(error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
        }

        function getEventPhotos(eventId) {
            var deferred = $q.defer();
            $http.get("mockdata/eventphotos.json")
                .then(function(response) {
                    var eventpic = _.find(response.data, function(photo) {
                        return photo.eventId == eventId;
                    });
                    deferred.resolve(eventpic.photos);
                }).catch(function(error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
        }
    }

    function fnEventController(eventService) {
        var eventCtrl = this;

        eventService.getEvents().then(function(events) {
            eventCtrl.events = events;
            //console.log(this.events);
        });

    }

    function fnEventPhotoController($stateParams, eventService) {
        var eventCtrl = this;
        eventCtrl.eventName = $stateParams.name + "(" + $stateParams.year + ")";
        eventService.getEventPhotos($stateParams.id)
            .then(function(photos) {
                eventCtrl.photos = photos;
                //console.log(eventCtrl.photos);
            });

    }

}(window.angular, window._));
