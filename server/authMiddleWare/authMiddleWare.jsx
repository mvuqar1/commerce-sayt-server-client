const jwt=require("jsonwebtoken")

module.exports=(req,res,next)=>{

 console.log(req.headers.authorization)
    try {
        //get token from header
        const token=req.headers.authorization.split(" ")[1]
        console.log(token)
        const decryptedToken=jwt.verify(token,process.env.jwt_secret)
        console.log(decryptedToken)
        req.body.userId=decryptedToken.userId
        next()
    } catch (error) {
        res.send({
            succes:false,
            message:error.message
        })
        
    }
}