// js/controllers/homeCtrl.js

// Controller for main page (displaying descriptors)

var app = angular.module('homeController', []);

app.controller('homeController', function($scope, $http, $location, $firebase){
	
	$scope.loaded = false;
	$scope.sounds = [];
	$scope.tags = [];
	$scope.selectedTags = [];
	$scope.relatedTags = [];
	$scope.results = [];
	$scope.soundLoaded = true;
	$scope.current = {};
	$scope.related = -1;
	$scope.showRelated = false;
	var main = {};

	$http.get('https://api.myjson.com/bins/21x3j')
		.success(function(data){
			main = data;
			$scope.sounds = main.sounds;
			for (var i = 0; i < $scope.sounds.length; i++)
				$scope.sounds[i].playing = false;
			$scope.tags = main.tags;
			$scope.loaded = true;
			$scope.selectedTags = [];
			$scope.results = [];
		})
		.error(function(data, status, headers, config){
			console.log(status);
		});



/*
	$scope.doIt = function(){
		console.log(main);
		
		for (var i = 0; i < main.sounds.length; i++){
			main.sounds[i].descriptors.forEach(function(desc){
				var word = checkString(desc[0]);
				var index = checkDup(word, main.tags);
				if (index){
					main.tags[index].indices.push(i);
				}else{
					main.tags.push({
						tagName: word,
						indices: [i]
					});
				}
			});
		}
		console.log(main);
		//console.log(JSON.stringify(main, null, 2));
		var url = "https://api.myjson.com/bins";
		$http.post(url, main)
			.success(function(data){
				console.log(data);
			}); 
	}

	function checkDup(word, arr){
		for (var i = 0; i < arr.length; i++){
			if (arr[i].tagName == word){
				return i;
			}
		}
		return false;
	} 

	function checkString(str){
		var ignoreArray = ["n/a", "no sound", "did not load", "nothing played", "(also no audio)", ".", "n/a", "sorry, this one has an error"];
		if (ignoreArray.indexOf(str) > -1)
			return false;
		else if(str.indexOf(",") > -1){
			return str.substring(0, str.indexOf(","));
		}else if (str.indexOf(" ") > -1){
			return str.substring(0, str.indexOf(" "));
		}else{
			return str;
		}
	} */

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
 	$scope.chooseRoot = function(tag) {
 		$scope.resetRelated();
 		$scope.choose($scope.tags[tag.rootTag]);
 	}

	$scope.choose = function(tag) {
    index = $scope.tags.indexOf(tag);
    $scope.tags.splice(index, 1);
    $scope.selectedTags.push(tag);
    $scope.results = $scope.results.concat(tag.indices);
    $scope.showResults();
  }

	$scope.unchoose = function(tag, index) {
		if ($scope.related == index) $scope.resetRelated();
    index = $scope.selectedTags.indexOf(tag);
    $scope.selectedTags.splice(index, 1);
    $scope.tags.push(tag);
    for (var i = 0; i < tag.indices.length; i++)
    	$scope.results.splice($scope.results.indexOf(tag.indices[i]), 1);
    $scope.showResults();
  }

  $scope.getRelated = function(tag, index) {
  	console.log($scope.relatedTags);
  	$scope.resetRelated();
  	$scope.related = index;
  	console.log($scope.relatedTags);
  	$scope.showRelated = true;
  	var pushedTags = [tag.tagName];
		for (var i = 0; i < tag.indices.length; i++) {
			var l = $scope.sounds[i].tags.length;
			for (var j = 0; j < l; j++) {
				for (var k = 0; k < $scope.tags.length; k++) {
			 		if ($scope.tags[k].tagName == $scope.sounds[i].tags[j] && pushedTags.indexOf($scope.tags[k].tagName) == -1) {
						var tag = {};
						tag.tagName = $scope.tags[k].tagName;
						tag.indices = $scope.tags[k].indices;
						$scope.relatedTags.push(tag);
						el = $scope.relatedTags.length - 1;
						for (var m = 0; m < $scope.relatedTags[el].indices.length; m++) {
							if ($scope.results.indexOf($scope.relatedTags[el].indices[m]) == -1)
								$scope.relatedTags[el].indices.splice(m--, 1);
						}
						if ($scope.relatedTags[el].indices.length == 0) {
							$scope.relatedTags.pop();
						} else {
							$scope.relatedTags[el].rootTag = k;
							pushedTags.push($scope.tags[k].tagName);
						}
						break;
					}
				}
			}
		}
  }

  $scope.resetRelated = function() {
		$scope.related = -1;
		$scope.relatedTags = [];
		$scope.showRelated = false;
  }

});