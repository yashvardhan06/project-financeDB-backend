const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: String,
    date: { type: Date, default: Date.now },
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
