
const express = require("express");
const app = express();
const { connect_db } = require("./config/database");


connect_db().then(() => {
  console.log("connection Established.");

  app.listen(Port, ()=>{
    console.log(`Server is listening on ${Port}`);
  })
}).catch((error) => {
  console.error("DataBase does not connected");
})