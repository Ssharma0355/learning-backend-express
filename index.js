const express = require("express");


const app = express();

const PORT = 8000;

// Routes
app.get("/",(req, res)=>{
    return res.send("hello from home page");
})

app.get("/about", (req, res) => {
  return res.send("hello from about page");
});
app.get("/contact", (req, res) => {
  return res.send("hello from contact page" + " Hi " + req.query.name + "your age is " + req.query.age);
});

app.listen(PORT, () => {
  console.log(`Server started from ${PORT} `);
});