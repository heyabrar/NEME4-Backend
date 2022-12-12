const express = require("express");
const app = express( );
const cors = require("cors");

const {connection} = require("./config/db");
const {UsersRouter} = require("./Routes/Users.routes");
const {TodoRouter} = require("./Routes/Todo.routes");
const {AuthenticateUser} = require("./MiddleWares/Authenticate")

app.use(express.json( ));
app.use(cors( ));
app.use("/users",UsersRouter);

app.use(AuthenticateUser)
app.use("/todo", TodoRouter);

app.listen(8080, async ( ) =>{
    try {
        await connection;
        console.log({"message"  :"Connected To nemevafour DataBase"})
    } catch (error) {
        console.log(error);
        console.log({"message" : "Error In Connecting DataBase"})
    }
})