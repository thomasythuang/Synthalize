// js/controllers/homeCtrl.js

// Controller for main page (displaying descriptors)

var app = angular.module('homeController', []);

app.controller('homeController', function($scope, $http, $location, $q, $firebase){
	
	
	var ref = new Firebase("https://synthalize.firebaseio.com/");
	var main = $firebase(ref).$asArray();
	$scope.loaded = false;
	$scope.sounds = [];
	$scope.soundLoaded = true;

	// Show the DOM once data is loaded
	main.$loaded(function(){

		for (var i = 0; i < main.length; i++){
			$scope.sounds[i] = main[i];
		}
		console.log($scope.sounds);
		$scope.loaded = true;
	});

	$scope.setSound = function(sound){
		$scope.soundLoaded = false;

		var source = document.getElementById('soundSource');
		var audio = document.getElementById('mainSound');
		var path = "sounds/" + sound.link;

		source.src = path;
		
		audio.pause();
		audio.load();
		audio.play();

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

	$scope.getTags = function(){
		var url = 'http://words.bighugelabs.com/api/2/b479b48665be0a6e5299356172937701/';

		
		//for (var i = 0; i < $scope.sounds.length; i++){
		var i = 47;
			for (var j = 1; j < $scope.sounds[i].descriptors.length; j++){
				var word = $scope.sounds[i].descriptors[j][0];
				
				$http.get(url + word + '/json')
					.success(function(data){
						var res = data;
						//console.log(res);
						for (var key in res){
							for (var k = 0; k < res[key].syn.length; k++){
								if ($scope.sounds[i].tags.indexOf(res[key].syn[k]) == -1)
									$scope.sounds[i].tags.push(res[key].syn[k]);
							}
						}
						console.log($scope.sounds[i]);
						main.$save($scope.sounds[i]);
					})
					.error(function(data, status, headers, config){
					}); 
			}
			console.log($scope.sounds[i]);
	}

});