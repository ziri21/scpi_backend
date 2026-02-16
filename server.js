const express = require("express");
const cors = require("cors");
require("dotenv").config();
const adminRouter = require("./routes/adminRoute.js");
const SGRouter = require("./routes/societeGestionRoute.js");
const scpiRouter = require("./routes/scpiRoute.js");

const connectDB = require("./config/db.js");
const app = express();
app.use(cors());
app.use(express.json());
const lancer = async () => {
  try {
    await connectDB();
    app.use("/admin", adminRouter);
    app.use("/societeGestion", SGRouter);
    app.use("/scpi", scpiRouter);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`le serveur est lancé sur le port :${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
  }
};
lancer();
