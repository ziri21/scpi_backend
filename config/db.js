const mongoose =require("mongoose")
require("dotenv").config();

const connectDb=async()=>{
    
try{ const connexion =await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connectee a "+connexion.connection.host)
    
    }
   
catch(err)
{
    console.log(err.message)

}
}
module.exports=connectDb;