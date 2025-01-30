const jwt = require("jsonwebtoken");
const Admin = require("../model/admin.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.createAdmin = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    } else {
      let { email } = req.body;
      let isExist = await Admin.findOne({ email: email });
      if (isExist) {
        return res.status(400).send({ error: "Email already exists" });
      } else {
        let hash = await bcrypt.hash(password, 10);
        req.body.password = hash;
        let admin = await Admin.create(req.body);
        // console.log(admin)

        try {
          let token = await jwt.sign(
            {
              id: admin.id,
              name: admin.name,
              email: admin.email,
              password: admin.password,
              role: admin.role,
            },
            process.env.JWT_SECRET
          );
          admin.token = token;
          // console.log(token)
          await admin.save();
          res.send({ msg: "User created", admin: admin, token });
        } catch (error) {
          res.send({ msg: "error creating user", error: error });
        }
      }
    }
  } catch (error) {
    res.send({ msg: "error creating user", error: error });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    let admin = await Admin.find();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let isExist = await Admin.findOne({ email: email });
    if (!isExist) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatched = await bcrypt.compare(password, isExist.password);

    if (!isMatched) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    let token = await jwt.sign(
      {
        id: isExist.id,
        name: isExist.name,
        email: isExist.email,
        password: isExist.password,
        role: isExist.role,
      },
      process.env.JWT_SECRET
    );
    res.json({
      msg: "logged in...",
      admin: {
        id: isExist.id,
        name: isExist.name,
        email: isExist.email,
        password: isExist.password,
        role: isExist.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

