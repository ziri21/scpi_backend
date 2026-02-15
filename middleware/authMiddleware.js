const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const protect = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "acces refusé" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decode.id).select("-password");
    req.admin = admin;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { protect };
