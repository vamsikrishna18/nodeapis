app.service("registerService",function($http){
    this.register=function(newUser){
        return $http.post("http://localhost:8080/register",newUser).then(function(posRes){return posRes},
                                                                        function(errRes){return errRes});
    }
});
