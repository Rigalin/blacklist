var app = angular.module('authorApp', []);

app.factory('Repository', function($http) {
	return {
		getFiles: function() {
			var request = {
				url: 'https://api.github.com/repos/fireflies/caution/contents/authors',
				headers: {
					'Accept': 'application/vnd.github.v3+json'
				},
				method: 'GET'
			}
			return $http(request);
		},
		getFile: function(file) {
			var request = {
				url: 'https://api.github.com/repos/fireflies/caution/contents/' + file,
				headers: {
					'Accept': 'application/vnd.github.v3+json'
				},
				method: 'GET'
			}
			return $http(request);
		},
		parseFile: function(input) {
			var author = { };
			console.log(input);
		}
	}
});

app.controller('authorController', function($scope, $http, Repository) {
	$scope.loading = false;
	$scope.failed = false;
	$scope.authors = [];

	$scope.get = function() {
		$scope.loading = true;
		$scope.failed = false;

		var request = Repository.getFiles();
		var fileNames = [];
		var files = [];
		request.success(function(data) {
			data.forEach(function(file) {
				fileNames.push(file.path);
			});
		});
		request.error(function(data) {
			console.log(data);
		});
	};

	$scope.get();
});