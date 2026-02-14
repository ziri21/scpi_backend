const express=require("express");
const router=express.Router();
const{protect}=require("../middleware/authMiddleware")
const{ inscription,
       connexion,
       getProfil,
       modifierPassword
}=require("../controllers/adminController")
router.post("/inscription",inscription)
router.post("/connexion",connexion)
router.get("/profile",protect,getProfil)
router.put("/modifiermMotDePass",protect,modifierPassword)



module.exports=router