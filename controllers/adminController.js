const Admin=require("../models/Admin")
const generateToken=require("../outils/generateToken")
exports.inscription= async(req,res)=>{
    const{email,password}=req.body;
    try{
        const exists= await Admin.findOne({email:email})
        if(exists){
            return res.status(400).json({message:"l admin exist déja "})
        }
    const admin = await Admin.create({email,password});
   return res.status(201).json({message:"Admin crée avec succè ",data:{
    email:admin.email,
    token:await generateToken(admin)
   }})
        }
        catch(err){
            return res.status(500).json({message:err.message})
        }

}
exports.connexion=async(req,res)=>{
    const {email,password}=req.body;
    try{
    const exists= await Admin.findOne({email});
    if(!exists){
        return res.status(404).json({message:"Email incorrecte"

        })
    }
    console.log(exists); 
  if( await exists.comparer(password)){
    return res.status(200).json({message:"connexion reussie",
        data:{
            email:exists.email,
            token: await generateToken(exists)
        }
    })
  } return res.status(400).json({message:"mot de passe incorrect"})
  }catch(err){
    return res.status(500).json({message:err.message})
  }
    
}
exports.getProfil=async(req,res)=>{
    const profil=req.admin;
    if(!profil){
        return res.status(403).json({message:"Accés refusé"})
    }
    return res.status(200).json(profil)
}
exports.modifierPassword=async(req,res)=>{
    const {password}=req.body;
    const admin=req.admin;
    try{
        const nouveau=await Admin.findById(admin._id);
        nouveau.password=password;
        await nouveau.save();
        console.log(nouveau)
        if(!nouveau){
            return res.status(404).json({message:"Mise a jours echouée"})
        }
         return res.status(201).json({message:"Mise a jours du mot de passe reussie"})


    }
    catch(err){

         return res.status(401).json({message:err.message})
    }
    
}