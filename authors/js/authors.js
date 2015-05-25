if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

var app = angular.module('authorApp', []);

app.factory('Repository', function($http) {
	return {
		getFiles: function() {
			var promise = $http.get('https://api.github.com/repos/fireflies/caution/contents/authors', {
				headers: {
					'Accept': 'application/vnd.github.v3+json'
				}
			}).then(function(data) {
				return data.data;
			});
			return promise;
		},
		getFile: function(file) {
			var promise = $http.get('https://api.github.com/repos/fireflies/caution/contents/' + file, {
				headers: {
					'Accept': 'application/vnd.github.v3+json'
				}
			}).then(function(data) {
				return data.data;
			});
			return promise;
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
		$scope.authors = [];

		Repository.getFiles().then(function(data) {
			if(!Array.isArray(data)) {
				$scope.failed = true;
				return;
			}

			data.forEach(function(fileData) {
				if(!fileData.name.endsWith('.yml')) return;
				Repository.getFile(fileData.path).then(function(file) {
					var content = atob(file.content);
					var yaml = jsyaml.load(content);
					$scope.authors.push(yaml);
				});
			});
			$scope.loading = false;
		});
	};

	$scope.get();
});