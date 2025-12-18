const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const db = require("../model/index")
const users = db.users

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
  req.userId = verifiedResult.id

  next()

}