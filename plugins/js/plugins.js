var hasExtension = function(input, suffix) {
    return input.indexOf(suffix, input.length - suffix.length) !== -1;
};

var app = angular.module('pluginApp', []);

app.factory('Repository', function($http) {
	return {
		getFiles: function() {
			var promise = $http.get('https://api.github.com/repos/fireflies/blacklist/contents/plugins', {
				headers: {
					'Accept': 'application/vnd.github.v3+json'
				}
			}).then(function(data) {
				return data.data;
			});
			return promise;
		},
		getFile: function(file) {
			var promise = $http.get('https://api.github.com/repos/fireflies/blacklist/contents/' + file, {
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

app.controller('pluginController', function($scope, $http, $timeout, Repository) {
	$scope.loading = false;
	$scope.failed = false;
	$scope.plugins = [];

	$scope.get = function() {
		$scope.loading = true;
		$scope.failed = false;
		$scope.plugins = [];

		Repository.getFiles().then(function(data) {
			if(!Array.isArray(data)) {
				$scope.failed = true;
				return;
			}

			try {
				for (var i = 0; i < data.length; i++) {
					if(hasExtension(data[i].name, '.yml')) {
						Repository.getFile(data[i].path).then(function(file) {
							var content = atob(file.content);
							var yaml = jsyaml.load(content);
							$scope.plugins.push(yaml);
						});
					}
				};

				$timeout(function() {
					$scope.loading = false;
				}, 1000);
			} catch (e) {
				$scope.loading = false;
				$scope.failed = true;
			}
		});
	};
	$scope.get();
});