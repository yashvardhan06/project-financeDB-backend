const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize'); 

//DASHBOARD SUMMARY
// 🔥 Admin + Analyst only
router.get('/summary', auth, authorize('Admin', 'Analyst'), async (req, res) => {
  try {
    const records = await Record.find();

    let income = 0;
    let expense = 0;

    records.forEach((r) => {
      if (r.type === 'income') income += r.amount;
      else expense += r.amount;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    });

  } catch (err) {
    res.status(500).json({ msg: 'Error generating summary' });
  }
});

module.exports = router;
