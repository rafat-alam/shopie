const express = require("express");
const path = require("path");

const app = express();

const port = 6777;

const users = require("./users.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/:u", (req, res) => {
  console.log("Request received for:", req.params.u);
  const { u } = req.params;

  if (users[u]) {
    res.render("found.ejs", {
      u,
      likes: users[u].likes,
      followers: users[u].followers,
      following: users[u].following,
    });
  } else {
    res.render("notfound.ejs", { u });
  }
});

app.get("*", (req, res) => {
  console.log("Request received for:", req.params[0]);
  res.render("accessdenied.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
