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
// for web browser we are sending HTML DOC SSR
app.get("/users",(req, res)=>{
    const html = `
    <ul>
    ${users.map(user =>(`<li>${user.first_name}</li>`)).join("")}
    </ul>
    `
    return res.send(html)
})

app.listen(PORT, () => {
  console.log(`Server started from ${PORT} `);
});