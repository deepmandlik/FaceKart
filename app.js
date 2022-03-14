var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var usersRouter = require("./routes/users");
const passport = require("passport")
const { mongo } = require("./configs/dbConnect");
const bodyParser = require("body-parser");

const app = express();

// DB connection

mongo();

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend")));
app.use(cors());
// app.use("/admin/login", indexRouter);

app.use(passport.initialize());

require('./middlewares/passport')(passport);

app.get('/',function(req,res) {
  res.sendFile('index.html');
});


app.use("/user", usersRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is listening on port: " + port);
});

module.exports = app;
