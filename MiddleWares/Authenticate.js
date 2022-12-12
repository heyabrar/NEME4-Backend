const JWT = require("jsonwebtoken");
require("dotenv").config( );

const AuthenticateUser = (req,res,next) =>{
    const token = req.headers?.authorization?.split(" ")[1];
    if(token)
    {
        const decoded = JWT.verify(token,process.env.JWT_KEY);
        if(decoded)
        {
            const userID = decoded.userID;
            req.body.userID = userID;
            next( );
        }

        else{
            res.status(400).send({"message" : "User Not Found, LogIn To Continue"})
        }
    }

    else{
        res.status(400).send({"message" : "User Not Found, LogIn To Continue"})
    }
};

module.exports = {
    AuthenticateUser
}