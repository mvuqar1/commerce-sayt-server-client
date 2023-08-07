const jwt=require("jsonwebtoken")

module.exports=(req,res,next)=>{
    console.log(req.body)
    try {
        //get token from header
        const token=req.headers.authorization.split(" ")[1]
        const decryptedToken=jwt.verify(token,process.env.jwt_secret)
        req.body.userId=decryptedToken.userId
        next()
    } catch (error) {
        res.send({
            succes:false,
            message:error.message
        })
        
    }
}