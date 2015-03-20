// public/js/ngRoutes.js
	angular.module('ngRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		
		.when('/', {
			templateUrl: 'views/visualizer.html',
			controller: 'homeController'
		})

		.when('/survey', {
			templateUrl: 'views/listen.html',
			controller: 'listenController'
		})

		.when('/done', {
			templateUrl: 'views/done.html',
		})

		.when('/about', {
			templateUrl: 'views/about.html',
		})

		.when('/future', {
			templateUrl: 'views/future.html',
		})
	
		.when('/404', {
			templateUrl: '../views/404.html',
		}); 

	$locationProvider.html5Mode(true);

}]);