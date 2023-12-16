const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const JWT=require("jsonwebtoken");
const cookie=require("cookie");

//models
const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,'Username is required'],
        },
        email:{
            type:String,
            required:[true,'Email is required'],
            unique:true,
        },
        password:{
            type:String,
            required:[true,'Password is required'],
            minLength:[6,'Password length should be min of 6 characters'],
        },
        customerId:{
            type:String,
            default:"",
        },
        subscription:{
            type:String,
            default:"",
        },

    }
);

//hashed password
userSchema.pre(`save`,async function(next){
    //update the password
    if(!this.isModified("password")){
        next();
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next();
});

//matching the password
userSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

//sign token
userSchema.methods.getSignedToken=function(res){
    const accessToken= JWT.sign({id:this._id},process.env.JWT_ACCESS_SECRET,
        {expiresIn:process.env.JWT_ACCESS_EXPIRESIN});
    const refreshToken= JWT.sign({id:this._id},process.env.JWT_REFRESH_SECRET,
            {expiresIn:process.env.JWT_REFRESH_EXPIRESIN});
    res.cookie('refreshToken',`${refreshToken}`,{maxAge:86400* 7000, httpOnly:true});
}   

const User=mongoose.model("User",userSchema);
module.exports=User;