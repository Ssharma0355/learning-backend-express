const express = require("express");
const fs = require("fs");
const cors = require("cors");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // For JSON body parsing

// GET /api/users - Get all users or search by name
app.get("/api/users", (req, res) => {
  const { name } = req.query;

  if (name) {
    const matchedUsers = users.filter(
      (user) =>
        user.first_name &&
        user.first_name.toLowerCase().includes(name.toLowerCase())
    );

    if (matchedUsers.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.json(matchedUsers);
  }

  return res.json(users);
});

// GET /users - Render user list in HTML (SSR hybrid)
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  res.send(html);
});

// POST /api/users - Add new user
app.post("/api/users", (req, res) => {
  const body = req.body;

  const maxId = Math.max(...users.map((u) => u.id), 0);
  const newUser = { ...body, id: maxId + 1 };

  users.push(newUser);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save user" });
    }

    res.json({ status: "success", user: newUser });
  });
});

// Routes for specific user by ID
app
  .route("/api/users/:id")
  // GET /api/users/:id - Get user by ID
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    res.json(user);
  })

  // PUT /api/users/:id - Full update (replace all data except ID)
  .put((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    users[index] = { ...req.body, id };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update user" });
      }

      res.json({ status: "success", user: users[index] });
    });
  })

  // PATCH /api/users/:id - Partial update
  .patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    Object.assign(user, req.body);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update user" });
      }

      res.json({ status: "success", user });
    });
  })

  // DELETE /api/users/:id - Remove user
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const deletedUser = users.splice(index, 1)[0];

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to delete user" });
      }

      res.json({ status: "success", deleted: deletedUser });
    });
  });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
