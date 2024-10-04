const router = require("express").Router();
const Expense = require("../models/Expense");
const { ensureAuth } = require("../middleware/auth"); // Custom middleware to protect routes

// View all expenses for the authenticated user
router.get("/", ensureAuth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
});

// Add a new expense
router.post("/add", ensureAuth, async (req, res) => {
  const { amount, description } = req.body;

  if (!amount || !description) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const expense = new Expense({
    userId: req.user.id,
    amount,
    description,
  });

  await expense.save();
  res.json(expense);
});

// Delete an expense
router.delete("/:id", ensureAuth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ msg: "Expense deleted" });
});

module.exports = router;
