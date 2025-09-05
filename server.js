const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();
app.use(bodyParser.json());

// SIGNUP
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run("INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, hash],
    function (err) {
      if (err) {
        return res.status(400).send("Username already exists!");
      }
      res.send("User registered!");
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
    if (!row) {
      return res.status(400).send("User not found!");
    }

    const match = await bcrypt.compare(password, row.password_hash);
    if (match) {
      res.send("Login successful ✅");
    } else {
      res.status(401).send("Wrong password ❌");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
