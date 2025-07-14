const express = require("express");


const app = express();

app.get("/",(req, res)=>{
    return res.send("hello from home page");
})

app.get("/about", (req, res) => {
  return res.send("hello from about page");
});
app.get("/contact", (req, res) => {
  return res.send("hello from contact page");
});

app.listen(3000,()=>{
    console.log("Server started from 3000")
})