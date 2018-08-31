var app = angular.module('App', ["ngRoute"]);  

app.config(function($routeProvider){
    $routeProvider.when("login",{
        url:"/login",
        templateurl:"client/templates/login.html",
        controller:"loginController"
    })
    .when("register",{
        url:"/register",
        templateurl:"client/templates/register.html",
        controller:"registerController"

    })
    .Otherwise("/login",{
        url:"/login",
        templateurl:"client/templates/login.html",
        controller:"loginController"

    });
});