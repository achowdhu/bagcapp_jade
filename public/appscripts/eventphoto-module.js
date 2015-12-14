(function(angular) {
    var mainModule = angular.module("appModule", ["ngAnimate"]);

    mainModule.directive('prettyp', function() {
        return function(scope, element, attrs) {
            $("[rel^='prettyPhoto']").prettyPhoto({
                deeplinking: false,
                social_tools: false
            });
        }
    });

    mainModule.factory("eventService", ["$http", "$q", fnEventService]);
    mainModule.controller("eventPhotoController", ["eventService", fnEventPhotoController]);

    function fnEventService($http, $q) {
        return {
            getEventPhotos: getEventPhotos
        }

        function getEventPhotos(eventId) {
            var deferred = $q.defer();
            $http.get("/photos/" + eventId)
                .then(function(response) {
                    deferred.resolve(response.data);
                }).catch(function(error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
        }
    }

    function fnEventPhotoController(eventService) {
        var eventCtrl = this;
        eventCtrl.getEventPhotos = function(eventYear, eventId, eventName) {
            eventCtrl.eventName = eventName + "(" + eventYear + ")";
            eventService.getEventPhotos(eventId)
                .then(function(photos) {
                    eventCtrl.photos = photos;
                });
        }
    }

}(window.angular));
