var app = angular.module('mittens', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
	.when('/', {
		templateUrl: 'home.html',
		controller: 'HomeController',
	})
	.when('/signup', {
		templateUrl: 'signup.html',
		controller: 'SignupController',
	});
});

app.run(function($rootScope, $cookies){
	if($cookies.get('token')&& $cookies.get('currentUser')){
		$rootScope.token = $cookies.get('token');
		$rootScope.currentUser = $cookies.get('currentUser');
	}
});

app.controller('HomeController', function($rootScope, $scope, $http, $cookies){
	
	$scope.submitNewMeow = function(){
		$http.post('/meows', 
			{newMeow: $scope.newMeow}, 
			{headers: {
				'authorization': $rootScope.token
			}}).then(function(){
			getMeows();
			$scope.newMeow = '';
		});
	};

	$scope.removeMeow = function(meow){
		$http.put('/meows/remove', 
			{meow: meow}, 
			{headers: {
				'authorization': $rootScope.token
			}}).then(function(){
			getMeows();
		});
	};

	$scope.signin = function(){
		$http.put('/users/signin', {username: $scope.username, password: $scope.password})
		.then(function(res){
			$cookies.put('token', res.data.token);
			$cookies.put('currentUser', $scope.username);
			$rootScope.token = res.data.token;
			$rootScope.currentUser = $scope.username;
		}, function(err){
			// alert('bad login credentials');

	    $scope.failTextAlert = "Wrong username or password!";
	    $scope.showFailAlert = true;

	    // switch flag
	    $scope.switchBool = function (value) {
	    $scope[value] = !$scope[value];
	    };

	    $scope.username = '';
		$scope.password = '';

		});
	};

	$scope.logout = function(){
		$cookies.remove('token');
		$cookies.remove('currentUser');
		$rootScope.token = null;
		$rootScope.currentUser = null;
		$scope.username = '';
		$scope.password = '';
		$scope.showFailAlert = false;
	}

	function getMeows(){
		$http.get('/meows').then(function(response) {
		$scope.meows = response.data;
		});
	};
	getMeows();
});

app.controller('SignupController', function($scope, $http, $window, $cookies, $rootScope){
	$scope.submitSignup = function(){
		var newUser = {
			username: $scope.username,
			password: $scope.password
		};
		$http.post('/users', newUser).then(function(res){
			$cookies.put('token', res.data.token);
			$cookies.put('currentUser', $scope.username);
			$rootScope.token = res.data.token;
			$rootScope.currentUser = $scope.username;
			$window.location.href = '#';
			$scope.showFailAlert = false;
		}, function(err){

			$scope.failTextAlert = "Username already exists!";
		    $scope.showFailAlert = true;

		    // switch flag
		    $scope.switchBool = function (value) {
		    $scope[value] = !$scope[value];
		    };

			$scope.username = '';
			$scope.password = '';
		});
	}
});
