var jwt = require("jsonwebtoken");
const jwt_sec = "dineshval";

// this gives u the object of the particular person and we can go throught it later on
const getuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a vaild token"});
    }
    try {
        const data=jwt.verify(token,jwt_sec);
        req.user=data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"please authenticate using a vaild token"})
        
    }
}

module.exports = getuser;
