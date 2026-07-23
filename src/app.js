const express = require("express");
const app = express();
app.use("/fireback/test", (req,res) => {
  res.send("Maine Heroien ho");
})

app.use("/fireback", (req,res) =>{
  res.send("chakede fadde");
})



app.use("/", (req,res) => {
  res.send("Lets's Nacho");
})



app.use("/test",(req,res)=>{
  res.send("Hello from inside");
})

app.listen(9000, () =>{
  console.log("Server is listening on 9000");
});
