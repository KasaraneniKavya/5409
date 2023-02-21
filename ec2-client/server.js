const express = require("express");
const app = express();
const path = require("path");
const PORT = 80;

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
