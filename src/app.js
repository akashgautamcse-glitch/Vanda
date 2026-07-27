const express = require("express");
const app = express();

const rH1 =  ((req,res,next) => {
  console.log("1st Route handler");
  // res.send("I'm in 1st route");
  next();
});
const rH2 = ((req, res, next) =>{
  // res.send("I'm in 2nd route");
  console.log("2nd route handler");
  next();
});
const rH3 = ((req,res,next) => {
  // res.send("I'm in 3rd route");
  next();
});
const rH4 = ((req,res,next) => {
  res.send("Request Resolve");
});

app.use("/admin",[rH1,rH2,rH3,rH4]);


app.listen(9000, () =>{
  console.log("Server is listening on 9000");
});
