const express = require("express");
const app = express();




app.get("/admin", (req, res) => {
  res.send("now you get the data in some time");
})

app.post("/admin", (req,res) =>{
  res.send("you'r data is saved");
})

app.delete("/admin", (req,res) => {
  res.send("Data delete Successfully");
})

app.use("/admin", (req,res) => {
  res.send("I'm Admin");
}) 




app.listen(9000, () =>{
  console.log("Server is listening on 9000");
});
