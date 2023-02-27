const express = require("express");
const app = express();
app.use(express.static("public"));
const { sendEmail } = require("../services/sendEmail");

const { engine } = require("express-handlebars");
// set template engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "backend/views");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

require("colors");

const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
require("dotenv").config({ path: configPath });

const { PORT = 5001 } = process.env;
const connectDb = require("../config/db");

//setRoutes
app.use("/api/v1", require("./routes/filmsRoutes"));
app.use("/api/v1", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/send", async (req, res) => {
  // res.send(req.body);
  try {
    await sendEmail(req.body);
    return res.status(200).render("send", {
      message: "success",
      name: req.body.name,
      email: req.body.email,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

const errorHandler = require("./middlewares/errorHandler");
const errorRoutesHandler = require("./middlewares/errorRoutesHandler");

app.use("*", errorRoutesHandler);

app.use(errorHandler);

connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.green.bold.italic);
});
