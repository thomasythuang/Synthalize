// public/js/ngRoutes.js
	angular.module('ngRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		/*
		// Gallery
		.when('/', {
			templateUrl: 'views/main.html',
			//controller: 'galleryController',
		})

		
		.when('/404', {
			templateUrl: '../views/404.html',
		}); */

	$locationProvider.html5Mode(true);

}]);