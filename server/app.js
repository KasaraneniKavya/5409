const express = require("express");
const cors = require("cors");

const { getCognitoMiddleware } = require("./middleware/cognitoAuth");
const usersRouter = require("./routers/usersRouter");
const imageRouter = require("./routers/imageRouter");
const textRouter = require("./routers/textRouter");
const historyRouter = require("./routers/historyRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", getCognitoMiddleware(), usersRouter);
app.use("/images", imageRouter);
app.use("/text", textRouter);
app.use("/history", historyRouter);

app.get("/", (req, res) => {
  res.send("<h1>Group42's Server</h1>");
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
