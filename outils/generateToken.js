const jwt=require("jsonwebtoken");
const generateToken=async(user)=>{
    const token= await jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
}
module.exports=generateToken;