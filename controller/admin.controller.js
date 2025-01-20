const jwt = require("jsonwebtoken")
const Admin = require("../model/admin.model")
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.createAdmin = async(req,res)=>{
    // try {
    //     const { email, password } = req.body;
    //     let isExists = await User.findOne({ email: email });
    //     if (isExists) {
    //       return res.send("admin already Exists");
    //     } else {
    //       let hash = await bcrypt.hash(password, 10);
    //       req.body.password = hash;
    //       let admin = await Admin.create(req.body);
    //       console.log('admin',admin);
          
    //       return res.status(201).json(admin);
    //     }
    //   } catch (error) {
    //     res.status(500).json({ error: error });
    //   }
    try {
        let admin = await Admin.create(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.getAdmins = async(req,res)=>{
    try {
        let admin = await Admin.find()
        res.status(200).json(admin)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.loginAdmin = async(req,res)=>{
    try {
        let {email, password} = req.body
        let isExist = await Admin.findOne({email:email})
        if(!isExist){
            return res.status(401).json({message: "Admin not found"})
        }

        const isMatched = await bcrypt.compare(password,isExist.password) 

        if(!isMatched){
            return res.status(401).json({message: "Incorrect password"})
        }

        let token =await jwt.sign({
            id:isExist.id,
            name:isExist.name,
            email: isExist.email
        },
        process.env.JWT_SECRET
    )
    res.json({
        msg:"logged in...",
        admin:{
            name:isExist.name,
            email: isExist.email,
            id:isExist.id,
        },
        token
    })

    } catch (error) {
        res.status(500).send(error.message)
    }
}