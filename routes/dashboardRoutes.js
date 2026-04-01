const express = require('express');
const router = express.Router();
const Record = require('../models/Record');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/summary', auth, role('analyst'), async (req, res) => {
    try {
        const records = await Record.find();
        let income = 0, expense = 0;

        records.forEach(r => {
            if (r.type === 'income') income += r.amount;
            else expense += r.amount;
        });

        res.json({
            totalIncome: income,
            totalExpense: expense,
            netBalance: income - expense
        });
    } catch {
        res.status(500).json({ msg: 'Error generating summary' });
    }
});

module.exports = router;
