const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    task : String,
    status : Boolean,
    tag : String,
    userID : String
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = {
    TodoModel
}