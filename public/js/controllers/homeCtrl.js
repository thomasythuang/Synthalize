// js/controllers/homeCtrl.js

// Controller for main page (displaying descriptors)

var app = angular.module('homeController', []);

app.controller('homeController', function($scope, $http, $location, $firebase){
	
	$scope.loaded = false;
	$scope.sounds = [];
	$scope.tags = [];
	$scope.selectedTags = [];
	$scope.results = [];
	$scope.soundLoaded = true;
	$scope.current = {};
	var main = {};

	$http.get('https://api.myjson.com/bins/3yp6f')
		.success(function(data){
			main = data;
			$scope.sounds = main.sounds;
			for (var i = 0; i < $scope.sounds.length; i++)
				$scope.sounds[i].playing = false;
			$scope.tags = main.tags;
			$scope.loaded = true;
			$scope.selectedTags = [];
			$scope.results = [];
			console.log($scope.sounds[0]);
		})
		.error(function(data, status, headers, config){
			console.log(status);
		});

	$scope.setSound = function(sound){
		$scope.soundLoaded = false;
		$scope.hideIcon($scope.current);
		$scope.current = sound;
		$scope.showIcon(sound);
		var source = document.getElementById('soundSource');
		var audio = document.getElementById('mainSound');
		var path = "sounds/" + sound.link;
		var button = document.getElementById('sound'+  sound.id);

		source.src = path;
		
		audio.pause();
		audio.load();
		audio.play();

		$scope.soundLoaded = true;
	}

	$scope.showIcon = function(sound) { sound.playing = true; }
	$scope.hideIcon = function(sound) { sound.playing = false; }

	// This will be more complicated later
	$scope.getWord = function(words) {
		return words[1][0];
	}

	$scope.test = function() {
		console.log($scope.desc)
		console.log(indices);
	}

	$scope.showResults = function() {
		console.log($scope.results);
		var l = $scope.sounds.length;
    for (var i = 0; i < l; i++) {
    	if (!$scope.results.length) {
    		$scope.sounds[i].result = false;
  			$scope.sounds[i].nonResult = false;
  		} else {
	    	id = $scope.sounds[i].id;
	    	if ($scope.results.indexOf(id) >= 0) {
	    		$scope.sounds[i].result = true;
	  			$scope.sounds[i].nonResult = false;
	    	}
	  		else {
	  			$scope.sounds[i].nonResult = true;
	  			$scope.sounds[i].result = false;
	  		}
	  	}
	  }
	}

 /*
	chemical compound, highlights stasis
	alex bell, highlights artic bells, pathos
	remove chem, keeps arctic bells, stasis
 */

	$scope.choose = function(tag, $event) {
    index = $scope.tags.indexOf(tag);
    $scope.tags.splice(index, 1);
    $scope.selectedTags.push(tag);
    $scope.results = $scope.results.concat(tag.indices);
    $scope.showResults();
  }

	$scope.unchoose = function(tag, $event) {
    index = $scope.selectedTags.indexOf(tag);
    $scope.selectedTags.splice(index, 1);
    $scope.tags.push(tag);
    for (var index in tag.indices)
    	$scope.results.splice($scope.results.indexOf(tag), 1);
    $scope.showResults();
  }

});