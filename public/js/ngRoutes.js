// public/js/ngRoutes.js
	angular.module('ngRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		
		// Gallery
		.when('/', {
			templateUrl: 'views/home.html',
			//controller: 'homeController'
		})

		.when('/listen', {
			templateUrl: 'views/listen.html',
			controller: 'listenController'
		})

		.when('/done', {
			templateUrl: 'views/done.html',
		})
		
		.when('/404', {
			templateUrl: '../views/404.html',
		}); 

	$locationProvider.html5Mode(true);

}]);