if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

var app = angular.module('userApp', []);

app.factory('Repository', function($http) {
	return {
		getFiles: function() {
			var promise = $http.get('https://api.github.com/repos/fireflies/watchlist/contents/users', {
				headers: {
					'Accept': 'application/vnd.github.v3+json'
				}
			}).then(function(data) {
				return data.data;
			});
			return promise;
		},
		getFile: function(file) {
			var promise = $http.get('https://api.github.com/repos/fireflies/watchlist/contents/' + file, {
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

app.controller('userController', function($scope, $http, Repository) {
	$scope.loading = false;
	$scope.failed = false;
	$scope.users = [];

	$scope.get = function() {
		$scope.loading = true;
		$scope.failed = false;
		$scope.users = [];

		Repository.getFiles().then(function(data) {
			if(!Array.isArray(data)) {
				$scope.failed = true;
				return;
			}

			for (var i = 0; i < data.length; i++) {
				if(!data[i].name.endsWith('.yml')) return;
				Repository.getFile(data[i].path).then(function(file) {
					var content = atob(file.content);
					try {
						var yaml = jsyaml.load(content);
						yaml.multiple = (typeof yaml.reasons != 'undefined');
						$scope.users.push(yaml);
					} catch (e) {
						console.log(e);
					}
				});
			};
			$scope.loading = false;
		});
	};

	$scope.spigot = function(author) {
		if(typeof author.id === 'undefined') return '#';
		return 'http://www.spigotmc.org/members/' + author.username + '.' + author.id + '/';
	}

	$scope.get();
});