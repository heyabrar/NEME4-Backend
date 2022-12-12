const {Router} = require("express");
const TodoRouter = Router( );

const {TodoModel} = require("../Models/Todo.model");

TodoRouter.get("/", async (req,res) =>{
    const userID = req.body.userID;
    try {
        const Todos = await TodoModel.find({userID});
        res.send(Todos);
    } catch (error) {
        res.status(400).send({"message" : "Something Went Wrong, Error In Getting Todos"})
    }
});


TodoRouter.get("/query", async (req,res) =>{
    const userID = req.body.userID;
    const {status} = req.query;
    const Todo = await TodoModel.findOne({userID});
    if(userID !== Todo.userID) res.status(400).send({"message" : "Oops! Seems Like You Have Not Logged In"});
    else{
        try {
            const Todos = await TodoModel.find({userID,status});
            res.send(Todos);
        } catch (error) {
            res.status(400).send({"message" : "Something Went Wrong, Error In Getting Todos"})
        }
    }
})


TodoRouter.post("/create", async (req,res) =>{
    const {task,status,tag,userID} = req.body;
    try {
        const NewTask = new TodoModel({task,status,tag,userID});
        await NewTask.save( );
        res.send({"message" : "Hurray!!! Task Added Succssfully"})
    } catch (error) {
        res.status(400).send({"message" : "Opps! Error In Adding Task"})
    }
})


TodoRouter.patch("/edit/:id", async (req,res) =>{
    const payload = req.body;
    const {id} = req.params;
    const {userID} = req.body;
    const Todo = await TodoModel.findOne({_id : id});
    if(userID !== Todo.userID) res.status(400).send({"message" : "Oops! Seems Like You Have Not Logged In"});
    else{
        try {
            await TodoModel.findByIdAndUpdate({_id : id}, payload);
            res.send({"message" : "Hurray!! Task Updated"});
        } catch (error) {
            res.status(400).send({"message" : "Oops! Something Really Went Wrong"});
        }
    } 
})


TodoRouter.delete("/delete/:id", async (req,res) =>{
    const {id} = req.params;
    const {userID} = req.body;
    const Todo = await TodoModel.findOne({_id : id});
    if(userID !== Todo.userID) res.status(400).send({"message" : "Oops! Seems Like You Have Not Logged In"});
    else{
        try {
            await TodoModel.findByIdAndDelete({_id : id});
            res.send({"message" : "Hurray!! Task Deleted"});
        } catch (error) {
            res.status(400).send({"message" : "Oops! Something Really Went Wrong"});
        }
    }
})

module.exports = {
    TodoRouter
}