const express = require("express");
const app = express();
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

const errorHandler = require("./middlewares/errorHandler");
const errorRoutesHandler = require("./middlewares/errorRoutesHandler");

app.use("*", errorRoutesHandler);

app.use(errorHandler);

connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.green.bold.italic);
});
