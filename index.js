//Intital Setup
const express=require("express");
const app=express();
const port=process.env.PORT || 8000;
const cors=require("cors");

//Used passport for authentication purpose and the strategy use is JWT strategy
const passport=require('passport');
const passportJWT=require('./config/passport-jwt');

//mongoose connection
const db=require("./config/mongoose");

//to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes folder
app.use('/',require("./routes"));

//server listens on port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`)
    }

    console.log(`Server is runnig on Port: ${port}`);
});