// console.log("dsfds");
const cors = require("cors");
const express = require("express");
const bp = require("body-parser");
const passport = require("passport");
const startApp = require("./startapp");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("./middlewares/passport")(passport);

// Initialize the application
const app = express();
// Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

// User Router Middleware
app.use("/api/users", require("./routes/users"));
app.use("/api/stations", require("./routes/stations"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("*", (req, res) => {
  res.redirect("/api-docs");
});
// Runing Application
startApp(app);
