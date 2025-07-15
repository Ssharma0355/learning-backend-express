const express = require("express");
const users = require("./MOCK_DATA.json")
const cors = require("cors")


const app = express();
app.use(cors());

const PORT = 8000;

// Routes
app.get("/users", (req, res) => {
    return res.json(users);
})

app.listen(PORT, () => {
  console.log(`Server started from ${PORT} `);
});