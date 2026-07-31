require('dotenv').config();
const express = require("express");
const app = express();
const { connect_db } = require("./config/database");
const { user } = require('../models/user');

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

//Delete API - Delete the user
app.delete("/user", async(req, res)=>{
  const userId = req.body.userId;
  try{
    const User = user.findById(userId);
    if(User){
    await user.deleteOne(User);
    res.send("User deleted successfully.");
    } else{
      res.status(404).send("ser not found");
    }
  } catch (err) {
    res.status(510).send("Something went wrong :( ");
  }
})

//Update API - Update the data
app.patch("/user", async(req, res) => {
  const update_data = req.body;
  const User = req.body.userId;
  try{
    await user.findByIdAndUpdate({_id : User}, update_data,{runValidators : true});
    res.send("Data updated");
  } catch (err) {
    res.status(410).send("UPDATE FAILED :(" + err.message);
  }
})

connect_db().then(() => {
  console.log("connection Established.");
  const Port = process.env.PORT;
  app.listen(Port, ()=>{
    console.log(`Server is listening on ${Port}`);
  })
}).catch((error) => {
  console.error("DataBase does not connected");
})