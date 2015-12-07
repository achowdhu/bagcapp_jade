(function(angular) {
    angular.module("appModule")
        .config(mainAppModuleConfig)
        .run(mainAppModuleRun);

    mainAppModuleConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$provide", "$windowProvider"];

    function mainAppModuleConfig($stateProvider, $urlRouterProvider, $provide, $windowProvider) {

        $provide.decorator('$uiViewScroll', function($delegate) {
            return function(uiViewElement) {
                //var top = uiViewElement[0].getBoundingClientRect().top;
                var $window = $windowProvider.$get();
                $window.scrollTo(0, 0); // (top - 30));
            };
        });
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "templates/main-tmpl.html"
            })
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/newuser
            .state('events', {
                url: "/events",
                templateUrl: "templates/events-tmpl.html",
                controller: "eventController",
                controllerAs: "eventCtrl"
            })
            .state('events.photos', {
                url: "/:year/:name/:id",
                templateUrl: "templates/events-photos-tmpl.html",
                controller: "eventPhotoController",
                controllerAs: "eventCtrl"
            })

        $urlRouterProvider.otherwise('/');
    }

    mainAppModuleRun.$inject = ["$rootScope", "$timeout", "$window"]
        // This is the key to view transition happiness!
    function mainAppModuleRun($rootScope, $timeout, $window) {
        $rootScope.$on('$stateChangeSuccess', function() {
            $timeout(function() {
                $window.scrollTo(0, 0);
            }, 500);
        });
    }

}(window.angular));
