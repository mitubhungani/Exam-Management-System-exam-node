const role = async (req, res, next) => {
    console.log("req.body.",req.user);

    if(req.user.role == "admin"){
        next();
    }else{
        res.status(403).json({ message: "Unauthorized access. Only admin can access this route." });
    }
    
}

const teacherRole = async (req, res, next) => {
    console.log("req.body.",req.user);

    if(req.user.role == "teacher"){
        next();
        
    }else{
        res.status(403).json({ message: "Unauthorized access. Only teacher can access this route." });
    }
}

module.exports = {role,teacherRole};