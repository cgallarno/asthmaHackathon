'use strict';

$app.run(function($rootScope){
	$rootScope.children = (_.isUndefined(localStorage.children) || localStorage.children == 'undefined')?[]:JSON.parse(localStorage.children);

	$rootScope.saveChildren = function(){
		localStorage.children = angular.toJson($rootScope.children);
	}
});

$app.controller('HomeCrtl', function ($scope, plus) {
	$scope.newChild = {};

	$scope.addChild = function(){
		$scope.alert = false;
		if(!_.isNaN(parseInt($scope.newChild.id)) && $scope.newChild.id.length == 5){
			$scope.newChild.points = Math.floor(Math.random()*100);
			$scope.children.push($scope.newChild);
			$scope.saveChildren();
			$navigate.go('/home', 'slide', true);
		}else{
			$scope.alert = {
				prefix : 'Uh Oh',
				message : 'That doesn\'t look like a valid id',
				class : 'alert-danger'
			}
		}
	}
});


$app.controller('childController', function($scope, $routeParams, plus){
	$scope.task = { user_id : $routeParams.id, completed : false, approved : false };

	function updateTasks(){
		plus.collection.get('tasks', { filter : 'user_id', value : $routeParams.id}).then(function(data){
			$scope.tasks = data;
		});
	}
	updateTasks();

	$scope.addTask = function(){
		$scope.alert = false;
		if(!_.isUndefined($scope.task.title) && !_.isUndefined($scope.task.points)){
			plus.collection.add('tasks', $scope.task).then(function(){
				$scope.alert = {
					prefix : 'Success!',
					message : 'The task was successfully added',
					class : 'alert-success'
				}

				updateTasks();
			});
		}else{
			$scope.alert = {
				prefix : 'Uh Oh',
				message : 'The Task\'s title and points are required',
				class : 'alert-danger'
			}
		}
	}
});
