const jwt = require("jsonwebtoken")
const { promisify } = require("util")

exports.isAuthenticated = async(req,res,next) =>{
   const token = req.cookies.token
   if(!token || token == null || token == undefined){
   return res.redirect ("/login")
   }
   // yedi token aayovane
  const verifiedResult = await promisify(jwt.verify) (token, process.env.secretKey)
  const user = await users.findByPk(verifiedResult.id)
  if(!user){
    return res.redirect("/login")
  }
  next()

}