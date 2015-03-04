// js/controllers/listenCtrl.js

// Controller for listening test

var app = angular.module('listenController', []);

app.controller('listenController', function($scope, $http, $firebase){
	
	$scope.loaded = false;
	$scope.desc = [];
	var indices;

	var ref = new Firebase("https://synthalize.firebaseio.com/");
	var data = $firebase(ref).$asArray();

	data.$loaded(function(){

		$scope.loaded = true;

		indices = getRandomNums(4, 32);
	});

	$scope.submit = function(){
		var valid = true;
		for (var n = 0; n < indices.length; n++){
			if ($scope.desc[i] == undefined)
				valid = false;
		}

		if (valid){
			var updated = [];
			for (var i = 0; i < indices.length; i++){

				var words = data[indices[i]].descriptors;
				var adj = $scope.desc[i].toLowerCase();
				var contained = false;
				var index;

				for (var j = 0; j < words.length; j++){
					var word = words[j][0];
					if (adj == word){
						contained = true;
						index = j;
					}
				}
				
				if (contained){
					words[index][1]++;
				}else{
					words.push([adj, 1]);
				}
		
				updated[i] = data[indices[i]];
				console.log(updated[i]);
				updated[i].descriptors = words;
				data.$save(updated[i]);
			}
		}else{
			alert('Please listen to all the sounds and fill out all the forms!')
		}
	}

	$scope.test = function(){
		console.log($scope.desc)
		console.log(indices);
	}

	function getRandomNums(n, max){
		var arr = [];
		while(arr.length < n){
		  var randomnumber=Math.floor(Math.random()*max)
		  var found=false;
		  for(var i=0;i<arr.length;i++){
				if(arr[i]==randomnumber){found=true;break}
		  }
		  if(!found)arr[arr.length]=randomnumber;
		}
		return arr;
	}

	
	$scope.reset = function(){
		for (var i=0; i<32; i++){
			data.$remove(i);
		}

		for (var i=0; i<32; i++){
			data.$add({id: i, link: "link here", descriptors: [
				["loud", 0]
				]
			});
		}

		data.$save();
		console.log(data);
	} 

});