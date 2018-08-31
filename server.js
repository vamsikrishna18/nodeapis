var express=require("express");
var router=express();
var user=require('./lib/user');
var dbConfig = require('./lib/db.config.js');
var mongoose = require('mongoose');
var binaryExtensions=require("binary-extensions");
var jwt=require("jwt-simple");
var bodyParser  = require('body-parser');


router.get('/',function(req,res,next){
    res.render('index',{title:express});
});


router.use(express.static(__dirname+"templates/register"));
router.use(express.static(__dirname+"templates/login"));
/*
router.get("/register", function (req, res) {
    res.sendfile(__dirname + "/client/frontend/signup.html");
  });
*/
router.use(express.static(__dirname+'/client'));
//router.use("./login",require("./client/controllers/logincontroller.js"));
//router.use("./register",require("./client/controllers/signupcontroller.js"));





  router.get("/login", function (req, res) {
  res.sendfile(__dirname + "templates/login.html");
  });

  
// get our request parameters
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

// Connecting to the database
mongoose.Promise = global.Promise;

    mongoose.connect(dbConfig.url, {
                    useNewUrlParser: true
                    }).then(() => {
                               console.log("Successfully connected to the database");    
                    }).catch(err => {
                               console.log('Could not connect to the database. Exiting now...');
                     process.exit();
    });
 

//login user

router.post("/login",function(req,res,next){
       var email=req.body.email;
       var password=req.body.password;

       user.findOne({email:email,password:password},function(err,user){
           if(err){
                   console.log(err); 
                    return res.status(500).
                              send("error while authenticating");
                  } 
            if(!user){
                   return res.status(404).
                              send("Error occured.user not matched......404");
                    }else{
                               var token=jwt.encode({'email':email,'password':password},'hr@maguresoftwares.com');
                                return res.send({login:'success',token:token})
                          
                          }
                         
                      //return res.status(200).
                      //send("you have been logged in......!");
    });
});

//register api

router.post('/register',function(req,res){
      var username=req.body.username;
      var  email=req.body.email;
      var password=req.body.password;
      var DOB=req.body.DOB;
      var BOI=req.body.BOI;
    
        var newUser=new user();
          newUser.username=username;
          newUser.email=email;
          newUser.password=password;
          newUser.DOB=DOB;
          newUser.BOI=BOI;
   
        newUser.save(function(err,savedUser){
              if(err){
                    console.log(err);
                    return res.status(500).
                                send("registration has been failed");
                      }
                    return res.status(200).
                                send("registered successfully");

    });
});           


module.exports=router;

//connecting to the server
router.listen(8080);
console.log("server listening to the port 8080");