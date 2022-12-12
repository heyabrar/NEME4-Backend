const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email : String,
    password : String,
});

const UserModel = mongoose.model("AuthUser", UserSchema);

module.exports = {
    UserModel
}