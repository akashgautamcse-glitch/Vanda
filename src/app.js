require('dotenv').config();
const express = require("express");
const app = express();
const { connect_db } = require("./config/database");
const { user } = require('../models/user');
const bcrypt = require('bcrypt');
const validationsignup = require("./utils/signupvalidation");

app.use(express.json());

//Sign-Up API
app.post("/signup", async(req, res) => {
  try{
    //sign-up validation
    validationsignup(req);

    //Password Encryption
    const {FirstName, LastName, email_id, Password} = req.body;
    const hashPassword = await bcrypt.hash(Password,10);

    //create user model
    const User = new user({FirstName, LastName, email_id, Password : hashPassword});

    //save user into DB
    await User.save();
    res.send("User is added Successfully");
} catch (error) {
    res.status(400).send("ERROR " + error.message);
} 

});

//login API
app.post("/login", async(req, res) => {
  try{
    const{email_id, Password} = req.body;
    const User =  await user.find({email_id : email_id});
    if(!User){
      throw new Error("Invalid credentials");
    }
    const ispasswordvalid = await bcrypt.compare(Password,User.Password);
    
    if(ispasswordvalid){
      res.send("login Successful");
    } 
    else{
      throw new Error("Invalid credentials");
    }
  } catch (err){
    res.status(510).send("Something went wrong :(" +  err.message);
  }
});

//Feed API - get all users from DB
app.get("/feed", async(req, res) =>{
  try{
    const users = await user.find({});
    res.send(users);
  } catch (err){
    res.status(440).send("Something went Wrong :( ")
  }
});

//Search API - get user by email
app.get("/user", async(req, res) => {
  const user_email = req.body.email_id;

  try{
     const User = await user.find({email_id : user_email});
    if(User){
     res.send(User);
    }else{
      res.send("User not found :( ");
    }
  } catch (err) {
     res.status(505).send("Something went wrong :( ")
  }
  
});

//Delete API - Delete the user
app.delete("/user", async(req, res)=>{
  const userId = req.body.userId;
  try{
    const User = user.findById(userId);
    if(User){
    await user.deleteOne(User);
    res.send("User deleted successfully.");
    } else{
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(510).send("Something went wrong :( ");
  }
});

//Update API - Update the data
app.patch("/user/:u_id", async(req, res) => {
  const update_data = req.body;
  const User = req.params?.u_id; 
  const ALLOWED_UPDATES = ["Bio", "Photo_URL", "FirstName", "LastName", "Password", "Skills"];
  try{
    const isAllowed = Object.keys(update_data).every((k) => ALLOWED_UPDATES.includes(k));

    if(!isAllowed){
      throw new Error("This field can't be updated");   
    };

    if(update_data?.Skills.length > 10){
      throw new Error("Skills can't be more than 10");
    }

    const updated_user = await user.findByIdAndUpdate(
      User,
      update_data,
      {
        new : true,
        runValidators : true
      }
    );

    if(!updated_user){
      return res.status(404).json({error : "user not found"});
    }

    res.send("Data updated");
  } catch (err) {
    res.status(410).send("UPDATE FAILED :(" + err.message);
  }
});

connect_db().then(() => {
  console.log("connection Established.");
  const Port = process.env.PORT;
  app.listen(Port, ()=>{
    console.log(`Server is listening on ${Port}`);
  })
}).catch((error) => {
  console.error("DataBase does not connected");
});