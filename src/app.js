const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./Middlewares/Auth");

app.use("/admin", adminAuth);


app.get("/admin/getdata", (req, res, next) => {
    res.send("get the data");
});

app.get("/admin/deletedata", (req, res, next) => {
   res.send("Delete the data");
});

app.get("/user/data", userAuth,(req, res, next) => {
  res.send("Get all the data");
})

app.post("/user/login", (req, res, next) => {
  res.send("logged in Successfully");
})

app.listen(9000, () =>{
  console.log("Server is listening on 9000");
});
