const mongoose=require("mongoose");
const bcrypt = require('bcrypt');

const AdminShema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Email invalid"]
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Le mot de passe doit avoir au moins 6 caractere "] ,
       

    }
})
AdminShema.pre("save",async function (next){
if(!this.isModified("password")){
    return ;
}
    const salt= await bcrypt.genSalt(8);
    this.password=await bcrypt.hash(this.password,salt);
    



})
AdminShema.methods.comparer=async function(mdpSaisi){
    return bcrypt.compare(mdpSaisi,this.password)

}
module.exports=mongoose.model("Admin",AdminShema)