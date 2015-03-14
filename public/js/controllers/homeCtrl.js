// js/controllers/homeCtrl.js

// Controller for main page (displaying descriptors)

var app = angular.module('homeController', []);

app.controller('homeController', function($scope, $http, $location, $firebase){
	
	
	//var ref = new Firebase("https://synthalize.firebaseio.com/");
	//var main = $firebase(ref).$asArray();
	$scope.loaded = false;
	$scope.sounds = [];
	$scope.tags = [];
	$scope.soundLoaded = true;
	var main = {};

	$http.get('https://api.myjson.com/bins/55bwf')
		.success(function(data){
			main = data;
			$scope.sounds = main.sounds;
			$scope.tags = main.tags;
			$scope.loaded = true;
			console.log(main);
		})
		.error(function(data, status, headers, config){
			console.log(status);
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

	/*
	// Show the DOM once data is loaded
	main.$loaded(function(){

		for (var i = 0; i < main.length; i++){
			$scope.sounds[i] = main[i];
		}

		main = {
			tags: [],
			sounds: []
		};
		
		main.sounds = $scope.sounds;

		for (var j = 0; j < main.sounds.length; j++){
			for (var k = 1; k < main.sounds[j].tags.length; k++){
				var index = checkDup(main.sounds[j].tags[k], main.tags);
				if (index == false){
					main.tags.push({
						tagName: main.sounds[j].tags[k],
						indices: [j]
					});
				}else{
					main.tags[index].indices.push(j);
				}
			}
		}

		console.log(main);
		//console.log(JSON.stringify(main, null, 2));

		var url = "https://api.myjson.com/bins";
		$http.post(url, main)
			.success(function(data){
				console.log(data);
			});

		//console.log($scope.sounds);
		$scope.loaded = true;
	});

	function checkDup(word, arr){
		for (var i = 0; i < arr.length; i++){
			for (var j = 0; j < arr[i].indices.length; j++){
					if (arr[i].tagName == word)
						return i;
			}
		}
		return false;
	} */

	/*
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
	} */

});