const router = require("express").Router();
const passport = require("passport");

// Auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});
<p></p>;

// Auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Auth with Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback route for Google to redirect to
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/expenses");
});

module.exports = router;
