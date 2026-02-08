const { users } = require("../../model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../../services/sendEmail")


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

    res.flash("seccess","Registered Successfully")
    res.redirect("login")
}

exports.renderLoginForm = (req,res) =>{
    const [error] = req.flash("error")
    const [success] = req.flash("success")
    res.render("login.ejs",{error,success})
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
        var token =jwt.sign({id : user[0].id}, process.env.secretKey,{expiresIn : '1d'}) 
        res.cookie('token',token)
        res.redirect("/")

       }else{
        res.flash("error","Invalid Email or Password")
        res.redirect("/login")
       }

    }

}


exports.logOutUser = (req,res) =>{
    res.clearCookie("token")
    res.redirect("/login")
}

exports.forgotPassword = (req,res)=>{
    const [error] = req.flash("error")
    res.render("forgotPassword",{error})
}

exports.handleForgotPassword = async(req,res)=>{
    const {email} = req.body ;
    if(!email){
        return res.send("Please provide Email")
    }

    const userData = await users.findAll({
        where:{
            email
        }
    })
    if(userData.length === 0){
        req.flash("error","No user with that email")
        res.redirect("/forgotPassword")
    }
    //tyo email ma otp send garne
    const otp = Math.floor(100000 + Math.random() * 900000)

    const data = {
        email : email,
        subject : "Your ForgotPassword OTP",
        text : "Your OTP is: "+ otp
    }
    await sendEmail(data)
    userData[0].otp = otp
    userData[0].otpGeneratedTime = Date.now()
    await userData[0].save()
    res.redirect("/otpForm?email=" + email)

}

exports.renderOtpForm = (req,res) =>{
    const email = req.query.email
    const [error] = req.flash("error")
    res.render("otpForm", {email : email, error})
}

exports.verifyOtp = async(req,res)=>{
    const{otp} = req.body
    const email = req.params.id
    const data = await users.findAll({
        where: {
            otp : otp,
            email : email
        }
    })
    if(data.length === 0){
        req.flash("error","Invalid OTP")
        res.redirect("/otpForm?email=" + email)
        return
    }
    const currentTime = Date.now()
    const otpGeneratedTime = data[0].otpGeneratedTime
    if(currentTime - otpGeneratedTime <= 120000){
        res.redirect(`/resetPassword?email=${email}&otp=${otp}`)
    }else{
        res.send("OTP has expired")
    }
    
}

exports.renderResetPassword = (req,res)=>{
    const {email,otp} = req.query
    if(!email || !otp){
        return res.send("Please provide email and otp")
    }
    res.render("resetPassword",{email,otp})
}

exports.handleResetPassword = async(req,res)=>{
    const email = req.params.email
    const otp = req.params.otp
    const {newPassword,newasswordConfirm} = req.body
    if(!email || !otp || !newPassword || !newasswordConfirm){
        return res.send("Please provide email,otp,newPassword,newPasswordConfirm")
    }
    if(newPassword !== newasswordConfirm){
        return res.send("New password and new password confirm must be same")
    }
    const userData = await users.findAll({
        where : {
            email,
            otp
        }
    })

    const currentTime = Date.now()
    const otpGeneratedTime = userData[0].otpGeneratedTime
    if(currentTime - otpGeneratedTime <= 120000){
        await users.update({
            password : bcrypt.hashSync(newPassword,8)
        },{
            where : {
                email : email
            }
        })
        res.redirect("/login")
    }else{
        res.send("OTP has expired")
    }
} 