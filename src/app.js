require('dotenv').config();
const express = require("express");
const app = express();
const { connect_db } = require("./config/database");
const { user } = require('../models/user');

const Port = process.env.PORT;
app.use(express.json());

//Sign-Up API
app.post("/signup", async(req, res) => {
  const User = new user(req.body);
  try{
    await User.save();
    res.send("User is added Successfully");
} catch (error) {
    res.status(400).send("Error found " + error.message);
} 

})

//Feed API - get all users from DB
app.get("/feed", async(req, res) =>{
  try{
    const users = await user.find({});
    res.send(users);
  } catch (err){
    res.status(440).send("Something went Wrong :( ")
  }
})

//Search API - get user by email
app.get("/user", async(req, res) => {
  const user_email = req.body.gmail_id;

  try{
     const User = await user.find({gmail_id : user_email});
    if(User){
     res.send(User);
    }else{
      res.send("User not found :( ");
    }
  } catch (err) {
     res.status(505).send("Something went wrong :( ")
  }
  
})

connect_db().then(() => {
  console.log("connection Established.");

  app.listen(Port, ()=>{
    console.log(`Server is listening on ${Port}`);
  })
}).catch((error) => {
  console.error("DataBase does not connected");
})