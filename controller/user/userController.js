const { users } = require("../../model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.renderAddUser = (req, res) => {
    res.render("addUSer")
}

exports.addUSer = async (req, res) => {

    const { name, email, password } = req.body


    //inserting into user tables
    await users.create({
        name: name,
        email: email,
        password : bcrypt.hashSync(password,12)
    })

    res.redirect("/login")
}

exports.renderLoginForm = (req,res) =>{
    res.render("login.ejs")
}

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.send("Please provide email and password")
    }

    // check whether the coming email user exists or not
   const user = await users.findAll({
        where : {
            email:email
        }
    })
    if(user.length == 0){
        res.send("No user exist with that email")
    }else{
        // tyo email ko user xa vanne bujiyo --> password pani check garne
       const isMatched = await  bcrypt.compareSync(password,user[0].password)
       if (isMatched){
        //generate tokens
        var token =jwt.sign({id : user[0].id}, 'thisissecretkeydontshare',{expiresIn : '1d'}) 
        res.cookie('token',token)
        res.send("Logged in Successfully")

       }else{
        res.send("Email or Password is invalid")
       }

    }

}