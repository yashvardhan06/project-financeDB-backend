const express = require('express');
const router = express.Router();
const Record = require('../models/Record');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role('admin'), async (req, res) => {
    try {
        const record = new Record({ ...req.body, user: req.user.id });
        await record.save();
        res.json(record);
    } catch {
        res.status(500).json({ msg: 'Error creating record' });
    }
});

router.get('/', auth, role('viewer'), async (req, res) => {
    try {
        const { type, category } = req.query;
        let filter = {};
        if (type) filter.type = type;
        if (category) filter.category = category;

        const records = await Record.find(filter).sort({ createdAt: -1 });
        res.json(records);
    } catch {
        res.status(500).json({ msg: 'Error fetching records' });
    }
});

router.put('/:id', auth, role('admin'), async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(record);
    } catch {
        res.status(500).json({ msg: 'Error updating record' });
    }
});

router.delete('/:id', auth, role('admin'), async (req, res) => {
    try {
        await Record.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Deleted successfully' });
    } catch {
        res.status(500).json({ msg: 'Error deleting record' });
    }
});

module.exports = router;
