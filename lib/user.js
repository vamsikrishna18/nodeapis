var mongoose=require("mongoose");

var userSchema=new mongoose.Schema({
    username:{type:String,
                unique:true,
                required:true,
                trim:true},
    email:{type:String,
            unique:true,
            required:true,
            trim:true},
    password:{type:String,
                required:true},
    DOB:{type:Date},
    BOI:{type:String,
            required:false}
});

var User= mongoose.model("logindetails",userSchema);
module.exports=User;
