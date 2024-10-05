const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
require("dotenv").config();
require("./config/passport-setup");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
