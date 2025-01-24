const jwt = require("jsonwebtoken");
require("dotenv").config();

const isToken = async (req, res, next) => {
    let publicRoutes = ['/login','/signup']
    if(publicRoutes.includes(req.url)){
        return next();
    }
  let token = req.headers.authorization?.split(" ")[1];
  console.log("token", token);

  if (!token) {
    return res.status(403).send({ msg: "token is required" });
  }

  try {
    let decode = await jwt.decode(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).send({ msg: "error verifying token " });
  }
};

module.exports = isToken;
