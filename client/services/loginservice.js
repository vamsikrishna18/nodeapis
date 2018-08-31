app.service("loginService",function($http){
    this.authenticate=function(user){
        return $http.post("http://localhost:8080/login",user).
                                        then(function(posRes){
                                            return posRes;
                                        },
                                            function(errRes){
                                                return errRes;
                                            });
    };

});