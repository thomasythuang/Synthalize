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
    $scope.selectedTags.push(tag);
    $scope.tags.pop(tag);
  }

});

app.animation('.selected-tag', function() {
  
  return {
    enter: function(element, done) {
      var tag = element.scope().tag;
      var targetPositions = {
        top: element.position().top,
        left: element.position().left
      };
      element.css('visibility', 'hidden');
      var $originEl = tag.$tag;
      var $clone = $originEl.clone();
      $clone.css({
        position: 'absolute',
        top: $originEl.position().top,
        left: $originEl.position().left
      });
      $('#selectedTags').append($clone);
      $clone.animate(targetPositions, 3000, function() {
        element.css('visibility', '');
        $clone.remove();
        done();
      });
    }
  };
});