const express = require("express");
const users = require("./MOCK_DATA.json")
const cors = require("cors")


const app = express();
app.use(cors());

const PORT = 8000;

// Routes for mobile application we sending json
app.get("/api/users", (req, res) => {
    return res.json(users);
})
// for web browser we are sending HTML DOC SSR hybrid server
app.get("/users",(req, res)=>{
    const html = `
    <ul>
    ${users.map(user =>(`<li>${user.first_name}</li>`)).join("")}
    </ul>
    `
    return res.send(html)
})
// Dynamic path for getting a specific user from DB

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.send(user);
    
})

app.listen(PORT, () => {
  console.log(`Server started from ${PORT} `);
});