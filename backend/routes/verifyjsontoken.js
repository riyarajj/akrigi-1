const jwt  =require("jsonwebtoken");


const verifyToken = (req,res,next)=>{
    const authHeaders = req.headers.authorization;
    if(authHeaders){
        const token = authHeaders.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("Token is not valid");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated");
    }
};

const verifyTokenAndAuth = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not authorised to perform the task!");
        }
    });
};

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not authorised to perform the task,only admin is!");
        }
    });
};

module.exports = { verifyToken ,verifyTokenAndAuth,verifyTokenAndAdmin };