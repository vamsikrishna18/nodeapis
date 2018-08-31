
 var app=angular.module("app",[]);

   app.controller("registerController",function($scope,registerService){
    $scope.sendData=function(newUser){
        registerService.register(newUser).then(function(res){
            $scope.result=res;
        });
    };
});