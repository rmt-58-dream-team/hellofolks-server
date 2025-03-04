const express = require("express");
const app = express();
const { User } = require("./models");

app.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json({ message: err.errors[0].message });
    } else if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
