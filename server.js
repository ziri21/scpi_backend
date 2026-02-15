const express=require("express");
const cors=require("cors")
const dotenv=require("dotenv").config();
const adminRouter=require("./routes/adminRoute.js")
const SGRouter=require("./routes/societeGestionRoute.js")

const connectDB=require("./config/db.js")
const app =express();
app.use(cors());
app.use(express.json())

connectDB();
app.use("/admin",adminRouter);
app.use("/societeGestion",SGRouter);
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{console.log(`le serveur est lancé sur le port :${PORT}`)})