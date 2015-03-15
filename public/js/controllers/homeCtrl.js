// js/controllers/homeCtrl.js

// Controller for main page (displaying descriptors)

var app = angular.module('homeController', []);

app.controller('homeController', function($scope, $http, $location, $firebase){
	
	$scope.loaded = false;
	$scope.sounds = [];
	$scope.tags = [];
	$scope.selectedTags = [];
	$scope.soundLoaded = true;
	var main = {};

	$http.get('https://api.myjson.com/bins/55bwf')
		.success(function(data){
			main = data;
			$scope.sounds = main.sounds;
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

	// This will be more complicated later
	$scope.getWord = function(words) {
		return words[1][0];
	}

	$scope.test = function() {
		console.log($scope.desc)
		console.log(indices);
	}

	$scope.choose = function(tag, $event) {
    tag.$tag = $($event.target);
    console.log(tag.indices);
    index = $scope.tags.indexOf(tag);
   	$scope.tags.splice(index, 1);
    $scope.selectedTags.push(tag);

    for (var i = 0; i < $scope.sounds.length; i++) {
    	descriptors = $scope.sounds[i].descriptors;
    	for (var j = 0; j < descriptors.length; j++) {
    		if (tag.tagName == descriptors[j][0]) {
    			$scope.results.push($scope.sounds[i]);
    			break;
    		}
    	}
    }

    names = [];
    ids = [];
    console.log($scope.results[0]);
    for (var i = 0; i < $scope.results.length; i++) {
  		names.push($scope.results[i].original);
  		ids.push($scope.results[i].link);
    }

  	console.log(ids);
  	console.log(names);
  }

	$scope.unchoose = function(tag, $event) {
    tag.$tag = $($event.target);
    index = $scope.selectedTags.indexOf(tag);
    $scope.selectedTags.splice(index, 1);
    $scope.tags.push(tag);
  }

});