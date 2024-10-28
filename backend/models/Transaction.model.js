// // backend/models/Transaction.model.js
// const mongoose = require('mongoose');

// const transactionSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   amount: { type: Number, required: true },
//   status: { type: String, enum: ['Success', 'Pending', 'Failed'], required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Transaction', transactionSchema);
