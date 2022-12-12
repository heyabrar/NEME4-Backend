const {Router, json}= require("express");
const UsersRouter = Router( );
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config( );

const {UserModel} = require("../Models/User.model");

UsersRouter.post("/signup", async (req,res) =>{
    const {email,password} = req.body;
    const User_Already_Exist = await UserModel.findOne({email});
    if(User_Already_Exist?.email) res.send({"message" : "User With Email Already Exist"});
    else{
        try {
            bcrypt.hash(password, 3, async (err,hash) =>{
                const UserSignUp = new UserModel({email,password:hash});
                await UserSignUp.save( );
                res.send({"message" : "Sign Up Successfull"})
            })
        } catch (error) {
            res.status(400).send({"message" : "Oops!! Something Went Wrong Failed To SignUp"})
        }
    }
})

UsersRouter.post("/login", async (req,res) =>{
    const {email,password} = req.body;
    const UserLogin = await UserModel.find({email});
    try {
        if(UserLogin.length > 0) 
        {
            const SecuredPassword = UserLogin[0].password;
            bcrypt.compare(password,SecuredPassword, function (err,result) {
                if(result)
                {
                    const token = JWT.sign({"userID" : UserLogin[0]._id}, process.env.JWT_KEY);
                    res.send({"message" : "We Have Created An Account For You", "token" : token});
                }
                else{
                    res.status(400).send({"message" : "User With Email Not Found, Try Again"})
                }
            })
        }
        else{
            res.status(400).send({"message" : "User With Email Not Found, Try Again"})
        }
    } catch (error) {
        res.status(400).send({"message" : "Oops!! Something Really Went Wrong, Try Again Later"})
    }
})

module.exports = {
    UsersRouter
}