var app = angular.module('app', []);

app.controller("loginController",function($scope,loginService,$location){
    $scope.login=function(user){
        loginService.authenticate(user).then(function(res){
            $scope.result=res;
            $location.path("http://maguresoftwares.com/");
        });
    };
});
    