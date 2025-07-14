const express = require("express");


const app = express();

app.get("/",(req, res)=>{
    return res.send("hello from home page");
})

app.get("/about", (req, res) => {
  return res.send("hello from about page");
});
app.get("/contact", (req, res) => {
  return res.send("hello from contact page" + " Hi " + req.query.name + "your age is " + req.query.age);
});

app.listen(3000,()=>{
    console.log("Server started from 3000")
})