// js/controllers/homeCtrl.js

// Controller for main page (displaying descriptors)

var app = angular.module('homeController', []);

app.controller('homeController', function($scope, $http, $location, $firebase){
	
	
	var ref = new Firebase("https://synthalize.firebaseio.com/");
	var data = $firebase(ref).$asArray();
	$scope.loaded = false;
	$scope.sounds = [];
	$scope.soundLoaded = true;

	// Show the DOM once data is loaded
	data.$loaded(function(){

		for (var i = 0; i < data.length; i++){
			$scope.sounds[i] = data[i];
		}

		$scope.loaded = true;
		//console.log($scope.sounds);
	});

	$scope.setSound = function(sound){
		$scope.soundLoaded = false;

		var source = document.getElementById('soundSource');
		var audio = document.getElementById('mainSound');
		var path = "sounds/" + sound.link;

		source.src = path;
		audio.load();

		$scope.soundLoaded = true;
	}

	// This will be more complicated later
	$scope.getWord = function(words){
		return words[1][0];
	}

	$scope.test = function(){
		console.log($scope.desc)
		console.log(indices);
	}

});