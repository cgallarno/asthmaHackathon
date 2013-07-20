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
		$scope.children.push($scope.newChild);
		$scope.saveChildren();
	}
});
