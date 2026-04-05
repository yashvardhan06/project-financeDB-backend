const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize'); // ✅ use new middleware

// ================= CREATE RECORD =================
// 🔥 Admin only
router.post('/', auth, authorize('Admin'), async (req, res) => {
  try {
    const record = new Record({
      ...req.body,
      user: req.user.id
    });

    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating record' });
  }
});

// ================= GET RECORDS =================
// 🔥 Admin + Analyst only
router.get('/', auth, authorize('Admin', 'Analyst'), async (req, res) => {
  try {
    const { type, category } = req.query;

    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;

    const records = await Record.find(filter).sort({ createdAt: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching records' });
  }
});

// ================= UPDATE RECORD =================
// 🔥 Admin only
router.put('/:id', auth, authorize('Admin'), async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(record);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating record' });
  }
});

// ================= DELETE RECORD =================
// 🔥 Admin only
router.delete('/:id', auth, authorize('Admin'), async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting record' });
  }
});

module.exports = router;